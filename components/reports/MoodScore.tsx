import React, { useEffect } from "react";
import {
  Canvas,
  Group,
  Path,
  SweepGradient,
  SkPath,
  Skia,
  vec,
} from "@shopify/react-native-skia";
import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useDerivedValue,
  SharedValue,
} from "react-native-reanimated";
import { View, StyleSheet, Text } from "react-native";

/* -------------------------------------------------------------------------- */
/* ────────────────────────  tweak-me constants  ──────────────────────────── */

const RING_COLORS: [string, string, string] = [
  "#FF006E", // outer (pink)
  "#FFD11A", // middle (yellow)
  "#00C8FF", // inner (cyan)
];

const RING_WIDTH = 16;           // stroke width of each ring
const GAP = 8;                  // gap between rings
const SIZE = 280;                // overall canvas size (square)
const DURATION = 1600;           // ms for the fill animation
const START_ANGLE = -90;         // start at top centre

/* -------------------------------------------------------------------------- */

type Props = {
  /** fill values from 0 → 1 for [outer, middle, inner] order */
  values: [number, number, number];
};


const Ring = ({
  radius,
  progress,   // shared value 0 → 1
  colour,
}: {
  radius: number;
  progress: SharedValue<number>;
  colour: string;
}) => {
  /*  convert progress (0-1) into a Skia path sweep  */
  const animatedSweep = useDerivedValue(() => progress.value * 360, []);

  /* computed path for the current frame - executed in Skia’s worklet */
  const path = useDerivedValue(() => {
    const p = Skia.Path.Make();
    const box = {
      x: -radius,
      y: -radius,
      width: radius * 2,
      height: radius * 2,
    };
    p.addArc(box, START_ANGLE, animatedSweep.value);
    return p;
  }, [animatedSweep]);

  return (
    <Path
      path={path}
      style="stroke"
      strokeWidth={RING_WIDTH}
      strokeCap="round"
    >
      <SweepGradient
        c={vec(0, 0)}
        colors={[colour, colour]} // solid colour (could blend if you pass 2)
      />
    </Path>
  );
};

export const ActivityRings = ({ values }: Props) => {
  /* clamp & animate the three progress values */
  const progresses: [
    SharedValue<number>,
    SharedValue<number>,
    SharedValue<number>
  ] = [
    useSharedValue(Math.max(0, Math.min(1, values[0]))),
    useSharedValue(Math.max(0, Math.min(1, values[1]))),
    useSharedValue(Math.max(0, Math.min(1, values[2]))),
  ];
  
  useEffect(() => {
    progresses.forEach((p, i) => {
      p.value = withTiming(values[i], {
        duration: DURATION,
        easing: Easing.out(Easing.cubic),
      });
    });
  }, [values]);

  /* radii – outer → inner */
  const radii = [
    SIZE / 2 - RING_WIDTH / 2,
    SIZE / 2 - RING_WIDTH / 2 - (RING_WIDTH + GAP),
    SIZE / 2 - RING_WIDTH / 2 - 2 * (RING_WIDTH + GAP),
  ] as const;

  return (
    <View style={styles.wrapper}>
      <Canvas style={{ width: SIZE, height: SIZE }}>
        <Group transform={[{ translateX: SIZE / 2 }, { translateY: SIZE / 2 }]}>
          {radii.map((r, idx) => (
            <Ring
              key={idx}
              radius={r}
              progress={progresses[idx]}
              colour={RING_COLORS[idx]}
            />
          ))}
        </Group>
      </Canvas>

      {/* central percentage label */}
      <View style={styles.labelWrap}>
        <Text style={styles.label}>
          {(values[2] * 100).toFixed(0)}
          %
        </Text>
      </View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*                                ✨  styles  ✨                               */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  wrapper: {
    width: SIZE,
    height: SIZE,
    alignSelf: "center",
    marginTop: -20
  },
  labelWrap: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#fff",
    fontSize: SIZE / 8,
    fontWeight: "700",
    fontFamily: 'SFPro-Bold',

  },
});
