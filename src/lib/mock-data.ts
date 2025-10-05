export interface Exercise {
  id: string;
  name: string;
  reps: string;
  weight: string;
  rpe: string;
  note: string;
}

export interface Day {
  id: string;
  name: string;
  exercises: Exercise[];
}

export interface Week {
  id: string;
  name: string;
  days: Day[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  weeks: Week[];
  createdBy: string; // email of creator (coach or athlete)
  creatorRole: "coach" | "athlete";
  isPublic: boolean; // whether athletes can browse and apply
}

export interface ProgramEnrollment {
  id: string;
  programId: string;
  athleteEmail: string;
  athleteName: string;
  enrolledDate: string;
  status: "active" | "completed" | "paused";
  invitedBy?: string; // coach email who invited
}

export interface ExerciseProgress {
  exerciseId: string;
  completed: boolean;
  actualReps?: string;
  actualWeight?: string;
  actualRpe?: string;
  notes?: string;
  completedDate?: string;
}

export interface DayProgress {
  dayId: string;
  exercises: ExerciseProgress[];
}

export interface WeekProgress {
  weekId: string;
  days: DayProgress[];
}

export interface AthleteProgress {
  enrollmentId: string;
  athleteEmail: string;
  programId: string;
  weeks: WeekProgress[];
  lastUpdated: string;
}

export const mockPrograms: Program[] = [
  {
    id: "1",
    name: "Strength Building Program",
    description:
      "A comprehensive 2-week strength building program focusing on compound movements",
    createdBy: "coach@gym.com",
    creatorRole: "coach",
    isPublic: true,
    weeks: [
      {
        id: "w1",
        name: "Week 1",
        days: [
          {
            id: "d1",
            name: "Upper Body",
            exercises: [
              {
                id: "e1",
                name: "Bench Press",
                reps: "3x8",
                weight: "185 lbs",
                rpe: "8",
                note: "Focus on controlled descent",
              },
              {
                id: "e2",
                name: "Pull-ups",
                reps: "3x6",
                weight: "Bodyweight",
                rpe: "7",
                note: "Full range of motion",
              },
            ],
          },
          {
            id: "d2",
            name: "Lower Body",
            exercises: [
              {
                id: "e3",
                name: "Squats",
                reps: "4x6",
                weight: "225 lbs",
                rpe: "8",
                note: "Depth below parallel",
              },
              {
                id: "e4",
                name: "Romanian Deadlift",
                reps: "3x8",
                weight: "185 lbs",
                rpe: "7",
                note: "Feel the stretch in hamstrings",
              },
            ],
          },
        ],
      },
      {
        id: "w2",
        name: "Week 2",
        days: [
          {
            id: "d3",
            name: "Upper Body",
            exercises: [
              {
                id: "e5",
                name: "Bench Press",
                reps: "3x6",
                weight: "195 lbs",
                rpe: "8",
                note: "Increase weight from week 1",
              },
              {
                id: "e6",
                name: "Pull-ups",
                reps: "3x8",
                weight: "Bodyweight",
                rpe: "7",
                note: "Add reps from week 1",
              },
            ],
          },
          {
            id: "d4",
            name: "Lower Body",
            exercises: [
              {
                id: "e7",
                name: "Squats",
                reps: "4x5",
                weight: "235 lbs",
                rpe: "8",
                note: "Progressive overload",
              },
              {
                id: "e8",
                name: "Romanian Deadlift",
                reps: "3x6",
                weight: "195 lbs",
                rpe: "7",
                note: "Increase weight, decrease reps",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Conditioning Program",
    description:
      "High-intensity conditioning program for improved cardiovascular fitness",
    createdBy: "coach@gym.com",
    creatorRole: "coach",
    isPublic: true,
    weeks: [
      {
        id: "w3",
        name: "Week 1",
        days: [
          {
            id: "d5",
            name: "HIIT Circuit",
            exercises: [
              {
                id: "e9",
                name: "Burpees",
                reps: "4x10",
                weight: "Bodyweight",
                rpe: "9",
                note: "Explosive movement",
              },
              {
                id: "e10",
                name: "Mountain Climbers",
                reps: "4x20",
                weight: "Bodyweight",
                rpe: "8",
                note: "Keep core tight",
              },
            ],
          },
          {
            id: "d6",
            name: "Cardio Focus",
            exercises: [
              {
                id: "e11",
                name: "Rowing Machine",
                reps: "5x500m",
                weight: "N/A",
                rpe: "8",
                note: "2 min rest between sets",
              },
              {
                id: "e12",
                name: "Jump Rope",
                reps: "3x2min",
                weight: "N/A",
                rpe: "7",
                note: "Maintain steady rhythm",
              },
            ],
          },
        ],
      },
      {
        id: "w4",
        name: "Week 2",
        days: [
          {
            id: "d7",
            name: "HIIT Circuit",
            exercises: [
              {
                id: "e13",
                name: "Burpees",
                reps: "4x12",
                weight: "Bodyweight",
                rpe: "9",
                note: "Increase reps from week 1",
              },
              {
                id: "e14",
                name: "Mountain Climbers",
                reps: "4x25",
                weight: "Bodyweight",
                rpe: "8",
                note: "Progressive overload",
              },
            ],
          },
          {
            id: "d8",
            name: "Cardio Focus",
            exercises: [
              {
                id: "e15",
                name: "Rowing Machine",
                reps: "5x600m",
                weight: "N/A",
                rpe: "8",
                note: "Increase distance",
              },
              {
                id: "e16",
                name: "Jump Rope",
                reps: "3x3min",
                weight: "N/A",
                rpe: "7",
                note: "Longer duration",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "My Personal Training",
    description: "Custom training program for personal goals",
    createdBy: "athlete@gym.com",
    creatorRole: "athlete",
    isPublic: false,
    weeks: [
      {
        id: "w5",
        name: "Week 1",
        days: [
          {
            id: "d9",
            name: "Full Body",
            exercises: [
              {
                id: "e17",
                name: "Deadlift",
                reps: "3x5",
                weight: "275 lbs",
                rpe: "8",
                note: "Focus on form",
              },
              {
                id: "e18",
                name: "Overhead Press",
                reps: "3x8",
                weight: "95 lbs",
                rpe: "7",
                note: "Strict form",
              },
            ],
          },
          {
            id: "d10",
            name: "Cardio",
            exercises: [
              {
                id: "e19",
                name: "Running",
                reps: "30 min",
                weight: "N/A",
                rpe: "6",
                note: "Easy pace",
              },
              {
                id: "e20",
                name: "Stretching",
                reps: "15 min",
                weight: "N/A",
                rpe: "3",
                note: "Full body",
              },
            ],
          },
        ],
      },
      {
        id: "w6",
        name: "Week 2",
        days: [
          {
            id: "d11",
            name: "Full Body",
            exercises: [
              {
                id: "e21",
                name: "Deadlift",
                reps: "3x5",
                weight: "285 lbs",
                rpe: "8",
                note: "Progressive overload",
              },
              {
                id: "e22",
                name: "Overhead Press",
                reps: "3x8",
                weight: "100 lbs",
                rpe: "7",
                note: "Increase weight",
              },
            ],
          },
          {
            id: "d12",
            name: "Cardio",
            exercises: [
              {
                id: "e23",
                name: "Running",
                reps: "35 min",
                weight: "N/A",
                rpe: "6",
                note: "Increase duration",
              },
              {
                id: "e24",
                name: "Stretching",
                reps: "15 min",
                weight: "N/A",
                rpe: "3",
                note: "Focus on tight areas",
              },
            ],
          },
        ],
      },
    ],
  },
];

export const mockEnrollments: ProgramEnrollment[] = [
  {
    id: "enr1",
    programId: "1",
    athleteEmail: "athlete@gym.com",
    athleteName: "John Athlete",
    enrolledDate: "2025-01-01",
    status: "active",
    invitedBy: "coach@gym.com",
  },
  {
    id: "enr2",
    programId: "2",
    athleteEmail: "athlete@gym.com",
    athleteName: "John Athlete",
    enrolledDate: "2025-01-15",
    status: "active",
    invitedBy: "coach@gym.com",
  },
];

export const mockProgress: AthleteProgress[] = [
  {
    enrollmentId: "enr1",
    athleteEmail: "athlete@gym.com",
    programId: "1",
    lastUpdated: "2025-01-10",
    weeks: [
      {
        weekId: "w1",
        days: [
          {
            dayId: "d1",
            exercises: [
              {
                exerciseId: "e1",
                completed: true,
                actualReps: "3x8",
                actualWeight: "185 lbs",
                actualRpe: "8",
                notes: "Felt strong today",
                completedDate: "2025-01-02",
              },
              {
                exerciseId: "e2",
                completed: true,
                actualReps: "3x6",
                actualWeight: "Bodyweight",
                actualRpe: "7",
                completedDate: "2025-01-02",
              },
            ],
          },
          {
            dayId: "d2",
            exercises: [
              {
                exerciseId: "e3",
                completed: true,
                actualReps: "4x6",
                actualWeight: "225 lbs",
                actualRpe: "8",
                completedDate: "2025-01-04",
              },
              {
                exerciseId: "e4",
                completed: true,
                actualReps: "3x8",
                actualWeight: "185 lbs",
                actualRpe: "7",
                completedDate: "2025-01-04",
              },
            ],
          },
        ],
      },
      {
        weekId: "w2",
        days: [
          {
            dayId: "d3",
            exercises: [
              {
                exerciseId: "e5",
                completed: true,
                actualReps: "3x6",
                actualWeight: "195 lbs",
                actualRpe: "9",
                notes: "Struggled a bit",
                completedDate: "2025-01-09",
              },
              {
                exerciseId: "e6",
                completed: false,
              },
            ],
          },
          {
            dayId: "d4",
            exercises: [
              {
                exerciseId: "e7",
                completed: false,
              },
              {
                exerciseId: "e8",
                completed: false,
              },
            ],
          },
        ],
      },
    ],
  },
];
