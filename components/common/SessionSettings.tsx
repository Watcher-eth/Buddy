// SettingsDropdown.tsx  (unchanged)
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import * as DropdownMenu from 'zeego/dropdown-menu'
import { useSettings } from '../../lib/stores/SessionSettingsStore'
import { AnimatedPressable } from './AnimatedPressable'
import { Sliders } from 'lucide-react-native'

export default function SettingsDropdown() {
  const {
    voice, genZMode, subtitles, guidedSession,
    setVoice, toggleGenZ, toggleSubtitles, toggleGuided,
  } = useSettings()

  return (
          <DropdownMenu.Root>
               <DropdownMenu.Trigger>
               <AnimatedPressable
                  style={styles.topIconWrapper}
                  haptics="light"
                  >
                   <Sliders color="#181818" width={24} height={24} />
                  </AnimatedPressable>
               </DropdownMenu.Trigger>
         
                  <DropdownMenu.Content sideOffset={6}>
                         <DropdownMenu.Trigger asChild>
                           <AnimatedPressable
                             style={styles.topIconWrapper}
                             haptics="light"
                           >
                             <Sliders color="#181818" width={24} height={24} />
                           </AnimatedPressable>
                         </DropdownMenu.Trigger>
                     <DropdownMenu.Sub>
                       <DropdownMenu.SubTrigger key="voice-trigger">
                         <DropdownMenu.ItemTitle>Voice ▸</DropdownMenu.ItemTitle>
                       </DropdownMenu.SubTrigger>
               
                       <DropdownMenu.SubContent sideOffset={2}>
                         {(['male','female'] as const).map((v) => (
                           <DropdownMenu.CheckboxItem
                             key={v}
                             value={voice === v ? 'on' : 'off'}
                             onValueChange={() => setVoice(v)}
                           >
                             <DropdownMenu.ItemTitle>
                               {v === 'male' ? 'Male' : 'Female'}
                             </DropdownMenu.ItemTitle>
                             <DropdownMenu.ItemIndicator><Text>✓</Text></DropdownMenu.ItemIndicator>
                           </DropdownMenu.CheckboxItem>
                         ))}
                       </DropdownMenu.SubContent>
                     </DropdownMenu.Sub>
               
                     {/* Toggles -------------------------------------------------------- */}
                     <DropdownMenu.CheckboxItem
                       key="genz"
                       value={genZMode ? 'on' : 'off'}
                       onValueChange={toggleGenZ}
                     >
                       <DropdownMenu.ItemTitle>Gen-Z mode</DropdownMenu.ItemTitle>
                       <DropdownMenu.ItemIndicator><Text>✓</Text></DropdownMenu.ItemIndicator>
                     </DropdownMenu.CheckboxItem>
               
                     <DropdownMenu.CheckboxItem
                       key="subtitles"
                       value={subtitles ? 'on' : 'off'}
                       onValueChange={toggleSubtitles}
                     >
                       <DropdownMenu.ItemTitle>Subtitles</DropdownMenu.ItemTitle>
                       <DropdownMenu.ItemIndicator><Text>✓</Text></DropdownMenu.ItemIndicator>
                     </DropdownMenu.CheckboxItem>
               
                     <DropdownMenu.CheckboxItem
                       key="guided"
                       value={guidedSession ? 'on' : 'off'}
                       onValueChange={toggleGuided}
                     >
                       <DropdownMenu.ItemTitle>Guided session</DropdownMenu.ItemTitle>
                       <DropdownMenu.ItemIndicator><Text>✓</Text></DropdownMenu.ItemIndicator>
                     </DropdownMenu.CheckboxItem>
                   </DropdownMenu.Content>
             </DropdownMenu.Root>
  )
}

const styles = StyleSheet.create({
  topIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

