import { View, Text } from "react-native";
import Report from "../../components/reports/report"

export default function ReportDetail() {
    return (
        <Report reportId={"1"} onRate={() => console.log("rate")}/>
    );
}