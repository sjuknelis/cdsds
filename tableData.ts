export const categories = [
    "Rigor of school record",
    "Class rank",
    "Academic GPA",
    "Standardized test scores",
    "Application essay",
    "Recommendation(s)",
    "Interview",
    "Extracurricular activities",
    "Talent/ability",
    "Character/personal qualities",
    "First generation",
    "Alumni relation",
    "Geographical residence",
    "State residency",
    "Religious commitment",
    "Racial/ethnic status",
    "Volunteer work",
    "Work experience",
    "Demonstrated interest"
];

const scoreValues = [
    "Very important",
    "Important",
    "Considered",
    "Not considered"
];

export async function getTableData(): Promise<string[][]> {
    const response = await fetch("/cdsds/all.csv");
    const text = await response.text();
    return text
        .split("\n")
        .map(row => row
            .split(",")
            .map((col, colIndex) => colIndex == 0 ? col : scoreValues[parseInt(col) - 1])
        )
        .sort((a, b) => a[0].localeCompare(b[0]));
}
