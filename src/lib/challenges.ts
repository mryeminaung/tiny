import {
  Paintbrush,
  Code,
  Brain,
  Users,
  UtensilsCrossed,
  Gamepad2,
  TreePine,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export type Category = "create" | "code" | "think" | "friends" | "eat" | "play" | "outside" | "random";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: 1 | 2 | 3;
  timeEstimate: string;
}

export interface CategoryMeta {
  id: Category;
  label: string;
  icon: LucideIcon;
  color: string;
}

export const categories: CategoryMeta[] = [
  { id: "create", label: "Create", icon: Paintbrush, color: "text-rose-500" },
  { id: "code", label: "Code", icon: Code, color: "text-sky-500" },
  { id: "think", label: "Think", icon: Brain, color: "text-violet-500" },
  { id: "friends", label: "Friends", icon: Users, color: "text-amber-500" },
  { id: "eat", label: "Eat", icon: UtensilsCrossed, color: "text-emerald-500" },
  { id: "play", label: "Play", icon: Gamepad2, color: "text-blue-500" },
  { id: "outside", label: "Outside", icon: TreePine, color: "text-lime-600" },
  { id: "random", label: "Random", icon: Sparkles, color: "text-[var(--primary)]" },
];

export const challenges: Challenge[] = [
  // ── Create ──
  { id: "c1", title: "Draw your pet (or dream pet)", description: "Grab a pen and paper. Sketch your pet — or the pet you wish you had. No skill required, just vibes.", category: "create", difficulty: 1, timeEstimate: "10 min" },
  { id: "c2", title: "Write a six-word story", description: "Hemingway did it. So can you. Tell a whole tale in exactly six words.", category: "create", difficulty: 1, timeEstimate: "5 min" },
  { id: "c3", title: "Design your dream room", description: "Open any design tool or just grab paper. Plan out your ideal room layout, colors, and furniture.", category: "create", difficulty: 2, timeEstimate: "30 min" },
  { id: "c4", title: "Write a haiku about today", description: "Five, seven, five. Capture the essence of your day in three lines.", category: "create", difficulty: 1, timeEstimate: "5 min" },
  { id: "c5", title: "Create a mini comic strip", description: "Draw a 4-panel comic about something that happened this week. Stick figures totally count.", category: "create", difficulty: 2, timeEstimate: "20 min" },
  { id: "c6", title: "Rearrange a shelf aesthetically", description: "Pick one shelf. Reorganize it by color, size, or vibes. Take a before/after photo.", category: "create", difficulty: 1, timeEstimate: "15 min" },
  { id: "c7", title: "Design a logo for an imaginary brand", description: "Invent a brand name and sketch a logo. Extra points if you describe what it sells.", category: "create", difficulty: 2, timeEstimate: "15 min" },
  { id: "c8", title: "Write a short letter to your future self", description: "What do you want to remember a year from now? Write it down and seal it.", category: "create", difficulty: 1, timeEstimate: "10 min" },

  // ── Code ──
  { id: "co1", title: "Build a random quote generator", description: "Make a simple page that shows a random quote each time you click a button. Bonus: add animations.", category: "code", difficulty: 2, timeEstimate: "30 min" },
  { id: "co2", title: "Create a CSS-only animation", description: "No JavaScript. Pure CSS. Make something move, spin, or morph on the page.", category: "code", difficulty: 2, timeEstimate: "20 min" },
  { id: "co3", title: "Build a color palette generator", description: "Generate 5 random colors and display them as swatches. Click to copy hex codes.", category: "code", difficulty: 2, timeEstimate: "30 min" },
  { id: "co4", title: "Solve a LeetCode Easy problem", description: "Pick any Easy problem on LeetCode. Think through it before coding. Time yourself.", category: "code", difficulty: 2, timeEstimate: "30 min" },
  { id: "co5", title: "Build a pomodoro timer", description: "25 minutes of work, 5 minutes of break. Simple countdown with sound notification.", category: "code", difficulty: 3, timeEstimate: "45 min" },
  { id: "co6", title: "Write a bash one-liner that does something cool", description: "Discover the power of the terminal. Find or write a one-liner that impresses you.", category: "code", difficulty: 2, timeEstimate: "15 min" },
  { id: "co7", title: "Make a CLI tool in your favorite language", description: "Even a simple one counts — a todo list, a timer, a random picker. Ship it to your global path.", category: "code", difficulty: 3, timeEstimate: "1 hour" },
  { id: "co8", title: "Create a markdown preview tool", description: "Split screen: type markdown on the left, see rendered output on the right. All in the browser.", category: "code", difficulty: 3, timeEstimate: "1 hour" },

  // ── Think ──
  { id: "t1", title: "List 10 things you're grateful for", description: "Right now, in this moment. Big or small. Get specific — the weirder, the better.", category: "think", difficulty: 1, timeEstimate: "5 min" },
  { id: "t2", title: "Solve a riddle", description: "A man pushes his car to a hotel and goes bankrupt. What happened? (Think before looking it up.)", category: "think", difficulty: 1, timeEstimate: "10 min" },
  { id: "t3", title: "Plan your ideal week", description: "If you had zero obligations, how would you spend 7 days? Block it out hour by hour.", category: "think", difficulty: 2, timeEstimate: "20 min" },
  { id: "t4", title: "Debate both sides of a silly question", description: "Is a hot dog a sandwich? Write a convincing argument for both sides.", category: "think", difficulty: 1, timeEstimate: "10 min" },
  { id: "t5", title: "Map out a skill you want to learn", description: "Break it into sub-skills. Order them from easiest to hardest. What's step one?", category: "think", difficulty: 2, timeEstimate: "15 min" },
  { id: "t6", title: "Think through the trolley problem", description: "Classic dilemma. But what if there were 100 people? One person who's a doctor? There's no right answer.", category: "think", difficulty: 2, timeEstimate: "15 min" },
  { id: "t7", title: "Write your personal mission statement", description: "In one sentence, what are you about? What drives you? Revise it 5 times.", category: "think", difficulty: 2, timeEstimate: "15 min" },
  { id: "t8", title: "Meditate for 5 minutes", description: "Set a timer. Close your eyes. Focus on your breathing. That's it. That's the challenge.", category: "think", difficulty: 1, timeEstimate: "5 min" },

  // ── Friends ──
  { id: "f1", title: "Text an old friend you haven't talked to in a while", description: "No special reason needed. Just say hi. You'll both feel good about it.", category: "friends", difficulty: 1, timeEstimate: "5 min" },
  { id: "f2", title: "Send a friend a meme that reminds you of them", description: "The best friendships are built on shared memes. Find the perfect one.", category: "friends", difficulty: 1, timeEstimate: "5 min" },
  { id: "f3", title: "Plan a spontaneous hangout", description: "Text someone right now: 'Are you free in an hour?' Go for a walk, grab coffee, or just hang.", category: "friends", difficulty: 2, timeEstimate: "15 min" },
  { id: "f4", title: "Write a recommendation for a friend's skill", description: "Think of something a friend is great at. Tell them — specifically — why they're good at it.", category: "friends", difficulty: 1, timeEstimate: "5 min" },
  { id: "f5", title: "Start a 30-day challenge with a friend", description: "Pick something — reading, running, cooking — and commit to doing it together for 30 days.", category: "friends", difficulty: 2, timeEstimate: "10 min" },
  { id: "f6", title: "Cook a meal for someone", description: "It doesn't have to be fancy. Even scrambled eggs count. The effort is the gift.", category: "friends", difficulty: 2, timeEstimate: "45 min" },
  { id: "f7", title: "Teach someone something you know", description: "A trick, a tip, a life hack. Share your knowledge with someone who'd appreciate it.", category: "friends", difficulty: 1, timeEstimate: "10 min" },
  { id: "f8", title: "Start a book club of two", description: "Pick a book with a friend. Agree to read 20 pages a week. Discuss after each session.", category: "friends", difficulty: 2, timeEstimate: "10 min" },

  // ── Eat ──
  { id: "e1", title: "Try a new recipe you've never made", description: "Pick something from your saved recipes or browse for inspiration. Cook it from scratch.", category: "eat", difficulty: 2, timeEstimate: "45 min" },
  { id: "e2", title: "Make a fancy coffee drink at home", description: "Latte, cortado, matcha — channel your inner barista. Froth, pour, enjoy.", category: "eat", difficulty: 1, timeEstimate: "10 min" },
  { id: "e3", title: "Prepare tomorrow's lunch right now", description: "Future you will be grateful. Make it something you'd actually be excited to eat.", category: "eat", difficulty: 1, timeEstimate: "15 min" },
  { id: "e4", title: "Bake something from scratch", description: "Cookies, banana bread, or even a mug cake. Fill your home with the smell of baking.", category: "eat", difficulty: 2, timeEstimate: "1 hour" },
  { id: "e5", title: "Try a food from a culture you're unfamiliar with", description: "Visit a grocery store or order something new. Expand your palate.", category: "eat", difficulty: 2, timeEstimate: "30 min" },
  { id: "e6", title: "Make a smoothie bowl", description: "Frozen fruit, yogurt, granola, toppings. Make it Instagram-worthy.", category: "eat", difficulty: 1, timeEstimate: "10 min" },
  { id: "e7", title: "Do a blind taste test with someone", description: "Blindfold a friend. Have them guess between 3 similar foods. Hilarious results guaranteed.", category: "eat", difficulty: 1, timeEstimate: "15 min" },
  { id: "e8", title: "Meal prep for the week", description: "Pick 2-3 recipes. Cook in bulk. Portion into containers. You've just saved yourself hours.", category: "eat", difficulty: 3, timeEstimate: "2 hours" },

  // ── Play ──
  { id: "p1", title: "Play a round of 20 Questions", description: "Think of something. Let someone (or yourself) ask yes/no questions to guess it.", category: "play", difficulty: 1, timeEstimate: "10 min" },
  { id: "p2", title: "Solve a crossword or Sudoku", description: "Pick your poison. Newspaper puzzles, apps, or print one out. Flex those brain muscles.", category: "play", difficulty: 2, timeEstimate: "15 min" },
  { id: "p3", title: "Have a dance party for one", description: "Put on your favorite song. Close the door. Dance like nobody's watching — because nobody is.", category: "play", difficulty: 1, timeEstimate: "5 min" },
  { id: "p4", title: "Play an instrument (or learn a new song)", description: "Dust off that guitar, sit at that piano, or use a virtual instrument app. Make some noise.", category: "play", difficulty: 2, timeEstimate: "20 min" },
  { id: "p5", title: "Try a speed puzzle challenge", description: "Find a jigsaw puzzle app or website. See how fast you can complete a 100-piece puzzle.", category: "play", difficulty: 2, timeEstimate: "30 min" },
  { id: "p6", title: "Play a retro video game", description: "Fire up an emulator or find an online retro game. Relive the classics.", category: "play", difficulty: 1, timeEstimate: "30 min" },
  { id: "p7", title: "Build something with LEGOs (or household items)", description: "Use whatever's around — blocks, boxes, cups. Build a tower, a house, a spaceship.", category: "play", difficulty: 1, timeEstimate: "20 min" },
  { id: "p8", title: "Do a DIY escape room", description: "Set up clues around your home. Solve the puzzle to 'escape.' Even solo is fun.", category: "play", difficulty: 3, timeEstimate: "1 hour" },

  // ── Outside ──
  { id: "o1", title: "Take a 15-minute walk without your phone", description: "Leave it behind. Observe the world. Notice things you've never seen on your street.", category: "outside", difficulty: 1, timeEstimate: "15 min" },
  { id: "o2", title: "Find and identify three plants or trees", description: "Use a plant ID app or a field guide. Learn the names of your green neighbors.", category: "outside", difficulty: 1, timeEstimate: "20 min" },
  { id: "o3", title: "Watch a sunset or sunrise", description: "Check the time. Get to a good spot. Just watch. No photos required (but allowed).", category: "outside", difficulty: 1, timeEstimate: "30 min" },
  { id: "o4", title: "Go for a bike ride with no destination", description: "Just ride. Turn left when you feel like it. Explore somewhere new in your own city.", category: "outside", difficulty: 2, timeEstimate: "45 min" },
  { id: "o5", title: "Do a photo walk", description: "Walk around and take 20 interesting photos. Find beauty in the mundane.", category: "outside", difficulty: 1, timeEstimate: "30 min" },
  { id: "o6", title: "Stargaze for 10 minutes", description: "Find a dark spot. Look up. Try to spot constellations, satellites, or shooting stars.", category: "outside", difficulty: 1, timeEstimate: "15 min" },
  { id: "o7", title: "Visit a local park you've never been to", description: "Every city has hidden gems. Find one and explore it.", category: "outside", difficulty: 1, timeEstimate: "30 min" },
  { id: "o8", title: "Have a picnic (even solo)", description: "Pack a snack, find a patch of grass, and eat outside. Simple pleasures.", category: "outside", difficulty: 1, timeEstimate: "30 min" },
];

function matchesTime(c: Challenge, maxMins: number): boolean {
  const match = c.timeEstimate.match(/(\d+)\s*(min|hour|hr)/i);
  if (!match) return true;
  const val = parseInt(match[1], 10);
  const mins = /hour|hr/i.test(match[2]) ? val * 60 : val;
  return mins <= maxMins;
}

function matchesDifficulty(c: Challenge, diff: number): boolean {
  return c.difficulty === diff;
}

export function getRandomChallenge(
  category?: Category | null,
  difficultyFilter?: number | null,
  maxTimeFilter?: number | null,
): Challenge {
  // Start with category pool
  let pool = category && category !== "random"
    ? challenges.filter((c) => c.category === category)
    : [...challenges];

  const hasDiff = difficultyFilter != null;
  const hasTime = maxTimeFilter != null && maxTimeFilter > 0;

  // Try both filters combined first
  if (hasDiff && hasTime) {
    const both = pool.filter(
      (c) => matchesDifficulty(c, difficultyFilter!) && matchesTime(c, maxTimeFilter!),
    );
    if (both.length > 0) return both[Math.floor(Math.random() * both.length)];
  }

  // Try difficulty only
  if (hasDiff) {
    const diffOnly = pool.filter((c) => matchesDifficulty(c, difficultyFilter!));
    if (diffOnly.length > 0) return diffOnly[Math.floor(Math.random() * diffOnly.length)];
  }

  // Try time only
  if (hasTime) {
    const timeOnly = pool.filter((c) => matchesTime(c, maxTimeFilter!));
    if (timeOnly.length > 0) return timeOnly[Math.floor(Math.random() * timeOnly.length)];
  }

  // Fallback: category only (or all)
  return pool[Math.floor(Math.random() * pool.length)];
}
