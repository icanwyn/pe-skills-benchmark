export type ChoiceQuestion = {
  id: number;
  kind: "mc";
  prompt: string;
  options: [string, string, string, string];
  answer: "A" | "B" | "C" | "D";
  skill: string;
};

export type FillQuestion = {
  id: number;
  kind: "fill";
  prompt: string;
  accept: string[];
  skill: string;
};

export type Question = ChoiceQuestion | FillQuestion;

export type SelfRating = {
  id: string;
  label: string;
};

export type BenchmarkTest = {
  id: string;
  title: string;
  grade: string;
  sport: string;
  blurb: string;
  questions: Question[];
  selfRatings: SelfRating[];
};

export const TESTS: BenchmarkTest[] = [
  {
    id: "softball-7",
    title: "Softball Skills Benchmark",
    grade: "7th Grade",
    sport: "Softball",
    blurb: "Rules, positions, throwing, catching, hitting, and safety.",
    selfRatings: [
      { id: "throw", label: "Throwing a ball to a partner (accurate and on target)" },
      { id: "catch", label: "Catching a thrown ball with a glove" },
      { id: "field", label: "Fielding a ground ball and making a throw" },
      { id: "hit", label: "Hitting a pitched ball" },
      { id: "run", label: "Running the bases with good form and awareness" },
    ],
    questions: [
      {
        id: 1,
        kind: "mc",
        prompt: "How many defensive players are on the field for one softball team at a time?",
        options: ["7", "8", "9", "11"],
        answer: "C",
        skill: "Field / positions",
      },
      {
        id: 2,
        kind: "mc",
        prompt: "A softball infield is shaped like a:",
        options: ["circle", "diamond", "oval track", "rectangle"],
        answer: "B",
        skill: "Field / positions",
      },
      {
        id: 3,
        kind: "mc",
        prompt: "A regulation softball game is usually played for how many innings?",
        options: ["3", "5", "7", "9"],
        answer: "C",
        skill: "Rules",
      },
      {
        id: 4,
        kind: "mc",
        prompt: "How many strikes make a strikeout?",
        options: ["2", "3", "4", "5"],
        answer: "B",
        skill: "Rules",
      },
      {
        id: 5,
        kind: "mc",
        prompt: "How many balls make a walk, so the batter goes to first base?",
        options: ["2", "3", "4", "5"],
        answer: "C",
        skill: "Rules",
      },
      {
        id: 6,
        kind: "mc",
        prompt: "A fly ball that is caught before it touches the ground is:",
        options: ["a run", "a foul tip only", "an out", "a walk"],
        answer: "C",
        skill: "Rules",
      },
      {
        id: 7,
        kind: "mc",
        prompt: "A batted ball that lands outside the foul lines is a:",
        options: ["home run", "fair ball", "foul ball", "steal"],
        answer: "C",
        skill: "Rules",
      },
      {
        id: 8,
        kind: "mc",
        prompt: "When you throw overhand, you should step toward your target with:",
        options: [
          "the same foot as your throwing hand",
          "the opposite foot of your throwing hand",
          "both feet at the same time",
          "no step at all",
        ],
        answer: "B",
        skill: "Throwing",
      },
      {
        id: 9,
        kind: "mc",
        prompt: "A balanced batting stance should include:",
        options: [
          "feet together and standing straight up",
          "feet about shoulder-width apart, knees bent, eyes on the pitcher",
          "standing on one foot with the bat on your shoulder",
          "looking at the outfield fence instead of the pitcher",
        ],
        answer: "B",
        skill: "Hitting",
      },
      {
        id: 10,
        kind: "mc",
        prompt: "Right after you hit a fair ball, you should:",
        options: [
          "throw the bat toward the dugout",
          "stay in the batter's box and watch the ball",
          "drop the bat safely and run to first base",
          "run straight to third base",
        ],
        answer: "C",
        skill: "Base running / safety",
      },
      {
        id: 11,
        kind: "mc",
        prompt: '"Tagging up" means a base runner:',
        options: [
          "leaves the base as soon as the ball is hit in the air",
          "waits on the base until a fly ball is caught, then may try to advance",
          "tags the umpire before running",
          "returns to the bench after a catch",
        ],
        answer: "B",
        skill: "Game sense",
      },
      {
        id: 12,
        kind: "mc",
        prompt: "The safest place to wait for your turn to bat is:",
        options: [
          "standing right beside the batter without a helmet",
          "swinging a bat near other students without looking",
          "behind the backstop or in the on-deck circle, wearing a helmet",
          "already standing on first base",
        ],
        answer: "C",
        skill: "Safety",
      },
      {
        id: 13,
        kind: "mc",
        prompt: "Which infield position plays between second base and third base?",
        options: ["first base", "second base", "shortstop", "catcher"],
        answer: "C",
        skill: "Field / positions",
      },
      {
        id: 14,
        kind: "mc",
        prompt: "A force out can happen when:",
        options: [
          "a runner may choose to stay and a fielder tags the runner",
          "a runner must go to the next base and a fielder touches that base with the ball",
          "the pitcher throws a ball",
          "the batter bunts foul with two strikes only",
        ],
        answer: "B",
        skill: "Game sense",
      },
      {
        id: 15,
        kind: "fill",
        prompt: "The player who throws the pitch to the batter is the",
        accept: ["pitcher"],
        skill: "Field / positions",
      },
      {
        id: 16,
        kind: "fill",
        prompt: "The player who crouches behind home plate to catch pitches is the",
        accept: ["catcher"],
        skill: "Field / positions",
      },
      {
        id: 17,
        kind: "fill",
        prompt: "A team's turn at bat ends after how many outs?",
        accept: ["3", "three"],
        skill: "Rules",
      },
      {
        id: 18,
        kind: "fill",
        prompt: "When catching a ball above your waist, your glove fingers should point",
        accept: ["up", "upward", "upwards"],
        skill: "Catching",
      },
      {
        id: 19,
        kind: "fill",
        prompt: "When catching a ball below your waist, your glove fingers should point",
        accept: ["down", "downward", "downwards"],
        skill: "Catching",
      },
      {
        id: 20,
        kind: "fill",
        prompt: "A hit that lets the batter reach first base safely is called a",
        accept: ["single", "base hit", "a single"],
        skill: "Hitting / scoring",
      },
    ],
  },
  {
    id: "basketball-8",
    title: "Basketball Skills Benchmark",
    grade: "8th Grade",
    sport: "Basketball",
    blurb: "Court, scoring, violations, dribbling, passing, defense, and safety.",
    selfRatings: [
      { id: "dribble", label: "Dribbling with either hand, head up" },
      { id: "pass", label: "Chest pass and bounce pass to a partner" },
      { id: "shoot", label: "Shooting a set shot or jump shot" },
      { id: "defense", label: "Defensive stance and defensive slide" },
      { id: "layup", label: "Finishing a layup with control" },
    ],
    questions: [
      {
        id: 1,
        kind: "mc",
        prompt: "How many players from one team are on the court at a time?",
        options: ["4", "5", "6", "7"],
        answer: "B",
        skill: "Court / positions",
      },
      {
        id: 2,
        kind: "mc",
        prompt: "A regulation basketball rim is how many feet above the floor?",
        options: ["8 feet", "10 feet", "12 feet", "15 feet"],
        answer: "B",
        skill: "Court / equipment",
      },
      {
        id: 3,
        kind: "mc",
        prompt: "A field goal made from inside the 3-point line is worth:",
        options: ["1 point", "2 points", "3 points", "4 points"],
        answer: "B",
        skill: "Rules / scoring",
      },
      {
        id: 4,
        kind: "mc",
        prompt: "A made free throw is worth:",
        options: ["1 point", "2 points", "3 points", "it depends"],
        answer: "A",
        skill: "Rules / scoring",
      },
      {
        id: 5,
        kind: "mc",
        prompt: "In middle school and high school rules, a player fouls out after how many personal fouls?",
        options: ["3", "4", "5", "6"],
        answer: "C",
        skill: "Rules",
      },
      {
        id: 6,
        kind: "mc",
        prompt: "Traveling is:",
        options: [
          "dribbling too fast",
          "taking steps with the ball without dribbling",
          "passing the ball over half court",
          "shooting from the corner",
        ],
        answer: "B",
        skill: "Rules / violations",
      },
      {
        id: 7,
        kind: "mc",
        prompt: "A player commits a double dribble if the player:",
        options: [
          "passes with two hands",
          "catches the ball and pivots",
          "stops the dribble, then starts dribbling again",
          "shoots a layup",
        ],
        answer: "C",
        skill: "Rules / violations",
      },
      {
        id: 8,
        kind: "mc",
        prompt: "The best cues for dribbling are:",
        options: [
          "slap the ball with a flat palm and look at it",
          "use fingertips, keep the ball low, keep your head up",
          "bounce the ball as high as your head",
          "dribble only with your strong hand",
        ],
        answer: "B",
        skill: "Dribbling",
      },
      {
        id: 9,
        kind: "mc",
        prompt: "A bounce pass should hit the floor:",
        options: [
          "right next to your own feet",
          "about two-thirds of the way to the receiver",
          "right under the receiver's shoes",
          "at half court no matter where the teammate is",
        ],
        answer: "B",
        skill: "Passing",
      },
      {
        id: 10,
        kind: "mc",
        prompt: "In a good defensive stance you should:",
        options: [
          "stand straight up with your arms at your sides",
          "cross your feet when you slide",
          "bend your knees and stay between your player and the basket",
          "hold the jersey of the player you are guarding",
        ],
        answer: "C",
        skill: "Defense",
      },
      {
        id: 11,
        kind: "mc",
        prompt: "Boxing out means:",
        options: [
          "standing under the rim with your back to the play",
          "putting your body between an opponent and the basket to get a rebound",
          "running to the bench after a miss",
          "waving both arms after a made shot",
        ],
        answer: "B",
        skill: "Rebounding",
      },
      {
        id: 12,
        kind: "mc",
        prompt: "After a made basket, the other team puts the ball in play from:",
        options: [
          "the baseline",
          "the sideline at half court",
          "the free-throw line",
          "out of bounds at midcourt only",
        ],
        answer: "A",
        skill: "Game sense",
      },
      {
        id: 13,
        kind: "mc",
        prompt: "The most dangerous thing to do when a player is shooting a layup is:",
        options: [
          "cheer from the sideline",
          "stand in a defensive stance nearby",
          "undercut the shooter as they land",
          "box out after the shot",
        ],
        answer: "C",
        skill: "Safety",
      },
      {
        id: 14,
        kind: "mc",
        prompt: "Which player usually brings the ball up the court and runs the offense?",
        options: ["center", "point guard", "power forward", "shooting forward only"],
        answer: "B",
        skill: "Court / positions",
      },
      {
        id: 15,
        kind: "fill",
        prompt: "The player who usually plays closest to the basket is the",
        accept: ["center", "the center", "post", "post player"],
        skill: "Court / positions",
      },
      {
        id: 16,
        kind: "fill",
        prompt: "When you stop your dribble, you must",
        accept: [
          "pass or shoot",
          "shoot or pass",
          "pass",
          "shoot",
          "pivot",
          "pivot pass or shoot",
          "pass, shoot, or pivot",
        ],
        skill: "Rules / skill",
      },
      {
        id: 17,
        kind: "fill",
        prompt: "A one-handed shot close to the basket, usually off one foot, is a",
        accept: ["layup", "a layup", "lay up"],
        skill: "Shooting",
      },
      {
        id: 18,
        kind: "fill",
        prompt: "The line that divides the court in half is the",
        accept: [
          "half-court line",
          "half court line",
          "halfcourt line",
          "midcourt line",
          "mid-court line",
          "mid court line",
          "half court",
          "half-court",
          "midcourt",
        ],
        skill: "Court / equipment",
      },
      {
        id: 19,
        kind: "fill",
        prompt: "Guarding one offensive player with one defender is called",
        accept: [
          "man-to-man",
          "man to man",
          "man to man defense",
          "man-to-man defense",
          "player-to-player",
          "player to player",
          "player-to-player defense",
        ],
        skill: "Defense",
      },
      {
        id: 20,
        kind: "fill",
        prompt: "Staying in the painted lane for more than three seconds on offense is a",
        accept: [
          "three-second violation",
          "three second violation",
          "3-second violation",
          "3 second violation",
          "three-second",
          "three second",
          "3-second",
          "3 second",
          "3 seconds",
          "lane violation",
        ],
        skill: "Rules / violations",
      },
    ],
  },
];

export function getTest(id: string) {
  return TESTS.find((t) => t.id === id) ?? null;
}
