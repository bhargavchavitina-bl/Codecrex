import { useEffect, useMemo, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowDownWideNarrow,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Code2,
  Compass,
  Flame,
  GraduationCap,
  Grid2X2,
  Layers,
  LogOut,
  Menu,
  Moon,
  Search,
  ShieldCheck,
  Star,
  Sun,
  Trophy,
  User,
  X,
  Clock3,
  RotateCcw,
  Target,
  ChartNoAxesCombined,
  ExternalLink,
  FileText,
  Lightbulb,
  AlertCircle,
} from "lucide-react";
import { topics } from "./data/topics";
import { problems, type Problem } from "./data/problems";
import { aptitudeTopics, aptitudeQuestions } from "./data/aptitude";
import {
  useStore,
  login,
  signup,
  googleLogin,
  resetPassword,
  logout,
  subscribeAuth,
  saveProgress,
  supabaseEnabled,
} from "./store";
import LearnContent from "./components/LearnContent";
function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      className={"brand " + (dark ? "brand-light" : "")}
      to="/"
      aria-label="CodeCrest home"
    >
      <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id="crest" x1="0" y1="1" x2="1" y2="0">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#crest)" />
        <path
          d="M20 27L10 37L20 47M44 27L54 37L44 47"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          opacity=".85"
        />
        <path
          d="M25 46L32 29L39 46"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="32" cy="19" r="4.5" fill="#F59E0B" />
      </svg>
      <span className="wordmark">
        <span>Code</span>
        <b>Crest</b>
      </span>
    </Link>
  );
}
function App() {
  const { user, dark } = useStore();
  useEffect(() => {
    return subscribeAuth();
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);
  useEffect(() => {
    const t = setInterval(
      () => void saveProgress().catch(console.error),
      15000,
    );
    return () => clearInterval(t);
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <Landing />}
      />
      <Route path="/login" element={<AuthPage kind="login" />} />
      <Route path="/signup" element={<AuthPage kind="signup" />} />
      <Route path="/forgot-password" element={<AuthPage kind="forgot" />} />
      <Route element={<Protected />}>
        <Route
          path="/dashboard"
          element={
            <Shell>
              <Dashboard />
            </Shell>
          }
        />
        <Route
          path="/dsa"
          element={
            <Shell>
              <DsaRoadmap />
            </Shell>
          }
        />
        <Route
          path="/dsa/:topicId"
          element={
            <Shell>
              <TopicPage />
            </Shell>
          }
        />
        <Route
          path="/aptitude"
          element={
            <Shell>
              <Aptitude />
            </Shell>
          }
        />
        <Route
          path="/aptitude/:topicId"
          element={
            <Shell>
              <AptitudeTopic />
            </Shell>
          }
        />
        <Route
          path="/test/:topicId/result"
          element={
            <Shell>
              <TestResult />
            </Shell>
          }
        />
        <Route
          path="/test/:topicId"
          element={
            <Shell>
              <TestEngine />
            </Shell>
          }
        />
        <Route
          path="/profile"
          element={
            <Shell>
              <Profile />
            </Shell>
          }
        />
        <Route
          path="/streak"
          element={
            <Shell>
              <StreakPage />
            </Shell>
          }
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
function Protected() {
  const { user, authReady } = useStore();
  if (!authReady) return <SkeletonPage />;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
function SkeletonPage() {
  return (
    <div className="skeleton-page">
      <div className="skeleton-brand" />
      <div className="skeleton-title" />
      <div className="skeleton-subtitle" />
      <div className="skeleton-grid">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="skeleton-card">
            <i />
            <i />
            <i />
          </div>
        ))}
      </div>
    </div>
  );
}
function Landing() {
  const features = [
    {
      icon: Layers,
      title: "A roadmap that makes sense",
      body: "Follow proven patterns, one focused topic at a time. See your progress as the picture comes together.",
    },
    {
      icon: GraduationCap,
      title: "Learn. Then put it to work.",
      body: "Build aptitude confidence with clear explanations, practical shortcuts and timed practice.",
    },
    {
      icon: Activity,
      title: "Small steps, real momentum",
      body: "Keep a gentle streak, revisit tricky questions and pick up exactly where you left off.",
    },
  ];
  return (
    <div className="landing">
      <header className="landing-nav">
        <Logo />
        <div className="nav-actions">
          <Link className="text-link" to="/login">
            Log in
          </Link>
          <Link className="btn btn-primary" to="/signup">
            Start learning <ArrowRight size={16} />
          </Link>
        </div>
      </header>
      <main>
        <section className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-dot" /> YOUR NEXT CHAPTER STARTS HERE
            </div>
            <h1>
              Build skills.
              <br />
              <span className="gradient-text">Earn your edge.</span>
            </h1>
            <p className="hero-body">
              A clearer path to interview confidence. Master coding patterns,
              sharpen your aptitude, and make progress that adds up.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary btn-lg" to="/signup">
                Start your journey <ArrowRight size={18} />
              </Link>
              <Link className="btn btn-quiet btn-lg" to="/login">
                I have an account
              </Link>
            </div>
            <div className="hero-social">
              <div className="avatar-stack">
                <i>R</i>
                <i>A</i>
                <i>S</i>
                <i>K</i>
              </div>
              <p>
                Built for the next generation
                <br />
                <strong>of engineers.</strong>
              </p>
            </div>
          </div>
          <div
            className="hero-art"
            aria-label="CodeCrest learning dashboard preview"
          >
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="float-card float-card-top">
              <div className="float-icon flame-icon">
                <Flame size={17} fill="currentColor" />
              </div>
              <div>
                <b>7 day streak</b>
                <small>You're on a roll!</small>
              </div>
              <span className="sparkle">✦</span>
            </div>
            <div className="preview-card">
              <div className="preview-top">
                <div className="preview-avatar">A</div>
                <div>
                  <b>Good morning, Aanya</b>
                  <small>Ready to climb a little higher?</small>
                </div>
                <div className="preview-dots">···</div>
              </div>
              <div className="preview-stats">
                <div>
                  <small>Problems solved</small>
                  <b>
                    24 <em>↗ 12%</em>
                  </b>
                </div>
                <div className="mini-progress">
                  <span>Weekly progress</span>
                  <b>68%</b>
                  <div className="track">
                    <i />
                  </div>
                </div>
              </div>
              <div className="preview-chart">
                <div className="chart-label">
                  <b>Your consistency</b>
                  <small>This week</small>
                </div>
                <div className="bars">
                  {[28, 48, 38, 72, 54, 85, 62].map((h, i) => (
                    <i
                      key={i}
                      className={i === 5 ? "bar-active" : ""}
                      style={{ height: h + "%" }}
                    />
                  ))}
                </div>
                <div className="chart-days">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
              </div>
              <div className="preview-next">
                <div className="next-icon">
                  <Code2 size={17} />
                </div>
                <div>
                  <small>PICK UP WHERE YOU LEFT OFF</small>
                  <b>Two pointers</b>
                </div>
                <button aria-label="Continue">
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
            <div className="float-card float-card-bottom">
              <div className="float-icon target-icon">
                <Target size={17} />
              </div>
              <div>
                <b>One problem at a time</b>
                <small>Today’s progress counts.</small>
              </div>
              <CheckCircle2 className="float-check" size={17} />
            </div>
            <span className="hero-star star-a">✳</span>
            <span className="hero-star star-b">✦</span>
          </div>
        </section>
        <section className="proof-strip">
          <div className="wrap proof-inner">
            <p>
              <span>↗</span> A path that grows with you
            </p>
            <p>
              <span>✦</span> Patterns over memorization
            </p>
            <p>
              <span>◷</span> Your progress, your pace
            </p>
          </div>
        </section>
        <section className="section wrap">
          <div className="section-heading">
            <div className="eyebrow">A BETTER WAY TO PREPARE</div>
            <h2>
              Make every session <span className="gradient-text">count.</span>
            </h2>
            <p>
              Everything you need to build confidence, thoughtfully put in one
              place.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((f, i) => (
              <motion.article
                key={f.title}
                className="feature-card"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
              >
                <div className="feature-icon">
                  <f.icon size={21} />
                </div>
                <span className="feature-number">0{i + 1}</span>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </motion.article>
            ))}
          </div>
        </section>
        <section className="cta-band">
          <div className="wrap cta-inner">
            <div>
              <span className="eyebrow">YOUR NEXT STEP IS A SMALL ONE</span>
              <h2>
                Every expert was once
                <br />a beginner.
              </h2>
              <p>Start with one topic. Build from there.</p>
            </div>
            <Link className="btn btn-light" to="/signup">
              Get started for free <ArrowRight size={17} />
            </Link>
            <div className="cta-mark">CC</div>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <Logo />
        <p>Code. Climb. Crest.</p>
        <small>© 2026 CodeCrest · Made for learners, by learners.</small>
      </footer>
    </div>
  );
}
function AuthPage({ kind }: { kind: "login" | "signup" | "forgot" }) {
  const [name, setName] = useState(""),
    [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [busy, setBusy] = useState(false),
    [err, setErr] = useState(""),
    [done, setDone] = useState(false);
  const nav = useNavigate();
  const guest = () => {
    useStore.getState().setUser({
      uid: "guest",
      name: "Guest learner",
      email: "",
      college: "",
      target: "Software Engineer",
      guest: true,
    });
    nav("/dashboard");
  };
  async function run(fn: () => Promise<unknown>) {
    setErr("");
    setBusy(true);
    try {
      const result = await fn();
      if (kind === "forgot" || (kind === "signup" && result === true))
        setDone(true);
      else nav("/dashboard");
    } catch (e) {
      const m =
        (e as Error).message || "Something went wrong. Please try again.";
      setErr(
        m
          .replace(/^AuthApiError:\s*/i, "")
          .trim(),
      );
    } finally {
      setBusy(false);
    }
  }
  const title =
    kind === "login"
      ? "Welcome back"
      : kind === "signup"
        ? "Start your journey"
        : "Reset your password";
  return (
    <div className="auth-page">
      <aside className="auth-side">
        <div className="auth-side-shape shape-a" />
        <div className="auth-side-shape shape-b" />
        <Logo dark />
        <div className="auth-side-content">
          <div className="eyebrow light-eyebrow">YOUR JOURNEY, YOUR PACE</div>
          <h1>
            Progress is built
            <br />
            one day at a time.
          </h1>
          <p>
            Find your rhythm, learn the patterns, and get closer to the role you
            want.
          </p>
          <div className="auth-quote">
            <div className="quote-stars">★★★★★</div>
            <p>
              “The structure helped me stop jumping between topics and start
              actually understanding them.”
            </p>
            <b>— A fellow climber</b>
          </div>
        </div>
        <small className="auth-side-foot">Code. Climb. Crest.</small>
      </aside>
      <main className="auth-main">
        <div className="auth-mobile-brand">
          <Logo />
        </div>
        <div className="auth-card">
          <div className="auth-heading">
            <div className="auth-kicker">
              {kind === "signup"
                ? "FREE TO GET STARTED"
                : kind === "forgot"
                  ? "ACCOUNT RECOVERY"
                  : "YOUR NEXT SESSION AWAITS"}
            </div>
            <h2>
              {title}
              <span className="heading-period">.</span>
            </h2>
            <p>
              {kind === "login"
                ? "Pick up where you left off."
                : kind === "signup"
                  ? "Create your account and take the first step."
                  : "We’ll email you a link to reset it."}
            </p>
          </div>
          {done ? (
            <div className="success-panel">
              <CheckCircle2 size={25} />
              <b>{kind === "signup" ? "Confirm your email" : "Check your inbox"}</b>
              <p>
                {kind === "signup"
                  ? `We sent a confirmation link to ${email}. Open it to finish creating your account.`
                  : `If an account exists for ${email}, we’ve sent a reset link.`}
              </p>
              <Link className="btn btn-primary" to="/login">
                Back to log in
              </Link>
            </div>
          ) : (
            <>
              <form
                className="auth-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (kind === "login") void run(() => login(email, password));
                  else if (kind === "signup")
                    void run(() => signup(name, email, password));
                  else void run(() => resetPassword(email));
                }}
              >
                {kind === "signup" && (
                  <label>
                    Full name
                    <input
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aanya Sharma"
                    />
                  </label>
                )}
                <label>
                  Email address
                  <input
                    required
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </label>
                {kind !== "forgot" && (
                  <label>
                    Password
                    <input
                      required
                      type="password"
                      minLength={6}
                      autoComplete={
                        kind === "signup" ? "new-password" : "current-password"
                      }
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={
                        kind === "signup"
                          ? "At least 6 characters"
                          : "Enter your password"
                      }
                    />
                    {kind === "login" && (
                      <Link className="forgot-link" to="/forgot-password">
                        Forgot password?
                      </Link>
                    )}
                  </label>
                )}
                {err && (
                  <div role="alert" className="form-error">
                    <AlertCircle size={16} />
                    {err}
                  </div>
                )}
                <button
                  disabled={busy}
                  className="btn btn-primary btn-full"
                  type="submit"
                >
                  {busy ? (
                    <span className="spinner" />
                  ) : kind === "login" ? (
                    "Log in"
                  ) : kind === "signup" ? (
                    "Create account"
                  ) : (
                    "Send reset link"
                  )}
                  {!busy && <ArrowRight size={16} />}
                </button>
              </form>
              {kind !== "forgot" && (
                <>
                  <div className="auth-divider">
                    <span />
                    or continue with
                    <span />
                  </div>
                  <button
                    className="google-btn"
                    disabled={busy}
                    onClick={() => void run(googleLogin)}
                  >
                    <GoogleIcon />
                    Continue with Google
                  </button>
                  <button className="guest-btn" onClick={guest}>
                    Continue as a guest <ArrowRight size={15} />
                  </button>
                </>
              )}
              {!supabaseEnabled && (
                <p className="auth-hint">
                  <ShieldCheck size={14} /> Supabase is not configured yet.
                  Guest mode works now.
                </p>
              )}
              <p className="auth-switch">
                {kind === "login" ? (
                  <>
                    New to CodeCrest?{" "}
                    <Link to="/signup">Create an account</Link>
                  </>
                ) : kind === "signup" ? (
                  <>
                    Already have an account? <Link to="/login">Log in</Link>
                  </>
                ) : (
                  <>
                    Remember your password? <Link to="/login">Log in</Link>
                  </>
                )}
              </p>
            </>
          )}
        </div>
        <div className="auth-bottom">
          <span>Secure sign-in</span>
          <span>·</span>
          <span>Made for your next step</span>
        </div>
      </main>
    </div>
  );
}
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
        transform="translate(0 5)"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.72 7.18l7.64 5.93c4.46-4.12 7.12-10.19 7.12-17.58z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59a14.4 14.4 0 0 1 0-9.18l-7.98-6.19a23.93 23.93 0 0 0 0 21.56l7.98-6.19z"
        transform="translate(0 5)"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.14 15.9-5.83l-7.64-5.93c-2.12 1.42-4.84 2.26-8.26 2.26-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
        transform="translate(0 -1)"
      />
    </svg>
  );
}
function Shell({ children }: { children: React.ReactNode }) {
  const { user, dark, theme, activeDays } = useStore(),
    [navOpen, setNavOpen] = useState(false),
    [globalOpen, setGlobalOpen] = useState(false),
    [streakOpen, setStreakOpen] = useState(false),
    [notice, setNotice] = useState("");
  const today = new Date().toLocaleDateString("en-CA"),
    streak = calcStreak(activeDays, today);
  useEffect(() => {
    if (notice) {
      const t = setTimeout(() => setNotice(""), 2800);
      return () => clearTimeout(t);
    }
  }, [notice]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setGlobalOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="app-shell">
      <header className="topbar">
        <button
          className="mobile-menu icon-button"
          onClick={() => setNavOpen((v) => !v)}
          aria-label="Toggle navigation"
        >
          {navOpen ? <X /> : <Menu />}
        </button>
        <Logo />
        <button
          className="topbar-search"
          onClick={() => setGlobalOpen(true)}
          aria-label="Search topics and problems"
        >
          <Search size={16} />
          <span>Search topics and problems...</span>
          <kbd>Ctrl K</kbd>
        </button>
        <div className="topbar-right">
          <button
            onClick={() => setStreakOpen((open) => !open)}
            className={
              "streak-button " +
              (activeDays.includes(today) ? "streak-done" : "")
            }
            aria-label={`Current streak ${streak} days`}
            aria-expanded={streakOpen}
          >
            <Flame size={18} fill="currentColor" />
            <b>{streak}</b>
          </button>
          <button
            onClick={theme}
            className="icon-button theme-button"
            aria-label={dark ? "Use light theme" : "Use dark theme"}
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <div className="user-menu">
            <Link to="/profile" className="user-avatar" aria-label="Profile">
              {(user?.name || "G")
                .split(" ")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </Link>
          </div>
        </div>
      </header>
      <div className="app-body">
        <aside className={"sidebar " + (navOpen ? "sidebar-open" : "")}>
          <div className="side-label">WORKSPACE</div>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "side-link " + (isActive ? "active" : "")
            }
          >
            <Grid2X2 size={17} />
            Overview
          </NavLink>
          <NavLink
            to="/dsa"
            className={({ isActive }) =>
              "side-link " + (isActive ? "active" : "")
            }
          >
            <Code2 size={17} />
            DSA roadmap <span className="side-badge">{problems.length}</span>
          </NavLink>
          <NavLink
            to="/aptitude"
            className={({ isActive }) =>
              "side-link " + (isActive ? "active" : "")
            }
          >
            <BookOpen size={17} />
            Aptitude
          </NavLink>
          <NavLink
            to="/streak"
            className={({ isActive }) =>
              "side-link " + (isActive ? "active" : "")
            }
          >
            <Flame size={17} />
            Your streak
          </NavLink>
          <div className="side-label side-label-spaced">YOUR SPACE</div>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              "side-link " + (isActive ? "active" : "")
            }
          >
            <User size={17} />
            Profile & goals
          </NavLink>
          <div className="side-spacer" />
          <div className="side-tip">
            <div className="tip-icon">
              <Lightbulb size={16} />
            </div>
            <b>One step at a time.</b>
            <p>A little progress every day adds up to something big.</p>
            <Link to="/dsa">
              Explore roadmap <ArrowRight size={13} />
            </Link>
          </div>
          <div className="sidebar-user">
            <div className="user-avatar small">
              {(user?.name || "G").slice(0, 1).toUpperCase()}
            </div>
            <div>
              <b>{user?.name}</b>
              <small>
                {user?.guest ? "Guest learner" : "Your learning space"}
              </small>
            </div>
            <button
              className="icon-button tiny"
              onClick={() => void logout()}
              aria-label="Log out"
            >
              <LogOut size={15} />
            </button>
          </div>
        </aside>
        <main
          className="main-content"
          onClick={() => navOpen && setNavOpen(false)}
        >
          {children}
        </main>
      </div>
      {globalOpen && <GlobalSearch onClose={() => setGlobalOpen(false)} />}
      {streakOpen && (
        <StreakPopover
          days={activeDays}
          today={today}
          current={streak}
          onClose={() => setStreakOpen(false)}
        />
      )}
      <MilestoneCelebration />
      {notice && (
        <div className="toast" role="status">
          <CheckCircle2 size={17} />
          {notice}
        </div>
      )}
    </div>
  );
}
function StreakPopover({
  days,
  today,
  current,
  onClose,
}: {
  days: string[];
  today: string;
  current: number;
  onClose: () => void;
}) {
  const now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth(),
    first = new Date(year, month, 1).getDay(),
    count = new Date(year, month + 1, 0).getDate(),
    active = new Set(days);
  const sorted = [...days].sort();
  let longest = 0,
    run = 0,
    last = "";
  for (const day of sorted) {
    const d = new Date(`${day}T12:00:00`),
      p = new Date(`${last}T12:00:00`);
    run =
      last && Math.round((d.getTime() - p.getTime()) / 86400000) === 1
        ? run + 1
        : 1;
    longest = Math.max(longest, run);
    last = day;
  }
  return (
    <div
      className="streak-popover-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="streak-popover card"
        role="dialog"
        aria-label="Streak calendar"
      >
        <button
          className="streak-popover-close icon-button"
          onClick={onClose}
          aria-label="Close streak calendar"
        >
          <X size={16} />
        </button>
        <div className="streak-popover-hero">
          <Flame size={23} fill="currentColor" />
          <div>
            <b>
              {current} day{current === 1 ? "" : "s"}
            </b>
            <small>current streak</small>
          </div>
          <span>
            <b>{Math.max(current, longest)}</b>
            <small>longest</small>
          </span>
        </div>
        <p className="streak-today-status">
          {active.has(today)
            ? "You showed up today. Keep your momentum going."
            : "Solve one problem or complete a practice test to keep your streak."}
        </p>
        <div className="streak-mini-month">
          <div className="streak-mini-title">
            {now.toLocaleDateString("en", { month: "long", year: "numeric" })}
          </div>
          <div className="streak-mini-grid">
            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
              <i className="mini-weekday" key={i}>
                {d}
              </i>
            ))}
            {Array.from({ length: first }, (_, i) => (
              <i key={`blank-${i}`} />
            ))}
            {Array.from({ length: count }, (_, i) => {
              const day = i + 1,
                key = new Date(year, month, day).toLocaleDateString("en-CA");
              return (
                <i
                  key={day}
                  className={`${active.has(key) ? "mini-day-active" : ""} ${key === today ? "mini-day-today" : ""}`}
                >
                  {day}
                </i>
              );
            })}
          </div>
        </div>
        <div className="streak-mini-heat">
          <span>PAST 28 DAYS</span>
          <div>
            {Array.from({ length: 28 }, (_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - (27 - i));
              const key = d.toLocaleDateString("en-CA");
              return (
                <i
                  key={key}
                  className={active.has(key) ? "mini-heat-active" : ""}
                  title={key}
                />
              );
            })}
          </div>
        </div>
        <Link
          onClick={onClose}
          to="/streak"
          className="btn btn-primary btn-full"
        >
          See your full streak <ArrowRight size={14} />
        </Link>
      </section>
    </div>
  );
}
function GlobalSearch({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    return {
      topics: topics
        .filter((topic) => !q || topic.name.toLowerCase().includes(q))
        .slice(0, 5),
      problems: problems
        .filter(
          (problem) =>
            !q ||
            problem.title.toLowerCase().includes(q) ||
            problem.companies.some((company) =>
              company.toLowerCase().includes(q),
            ),
        )
        .slice(0, 7),
    };
  }, [query]);
  return (
    <div
      className="modal-backdrop search-backdrop"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <section
        className="global-search-modal card"
        role="dialog"
        aria-modal="true"
        aria-label="Search CodeCrest"
      >
        <div className="global-search-input">
          <Search size={18} />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => event.key === "Escape" && onClose()}
            placeholder="Search topics, problems or companies…"
          />
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Close search"
          >
            <X size={17} />
          </button>
        </div>
        <div className="global-results">
          <span className="global-result-label">TOPICS</span>
          {results.topics.map((topic) => (
            <Link
              onClick={onClose}
              className="global-result"
              key={topic.id}
              to={`/dsa/${topic.id}`}
            >
              <Layers size={15} />
              <span>
                {topic.name}
                <small>{topic.description}</small>
              </span>
              <ChevronRight size={15} />
            </Link>
          ))}
          <span className="global-result-label">PROBLEMS</span>
          {results.problems.map((problem) => (
            <Link
              onClick={onClose}
              className="global-result"
              key={problem.id}
              to={`/dsa/${problem.topicId}`}
            >
              <Code2 size={15} />
              <span>
                {problem.title}
                <small>{problem.companies.join(" · ")}</small>
              </span>
              <span
                className={`difficulty ${problem.difficulty.toLowerCase()}`}
              >
                {problem.difficulty}
              </span>
            </Link>
          ))}
          {results.topics.length + results.problems.length === 0 && (
            <p className="global-no-results">
              No matches yet. Try a shorter search.
            </p>
          )}
        </div>
        <div className="global-search-foot">
          <span>Search across the DSA roadmap</span>
          <kbd>ESC</kbd>
        </div>
      </section>
    </div>
  );
}
function MilestoneCelebration() {
  const { activeDays } = useStore(),
    today = new Date().toLocaleDateString("en-CA"),
    streak = calcStreak(activeDays, today),
    [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!activeDays.includes(today) || ![7, 30, 100].includes(streak)) return;
    const key = `codecrest-milestone-${today}-${streak}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "seen");
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 4200);
    return () => clearTimeout(timer);
  }, [activeDays, today, streak]);
  if (!visible) return null;
  return (
    <div className="milestone-overlay" role="status" aria-live="polite">
      <div className="confetti">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
      <div className="milestone-card">
        <span>✦</span>
        <b>{streak} days of showing up</b>
        <small>That’s something to be proud of.</small>
      </div>
    </div>
  );
}
function calcStreak(days: string[], today: string) {
  const s = new Set(days);
  const d = new Date(today + "T12:00:00");
  let n = 0;
  if (!s.has(today)) {
    d.setDate(d.getDate() - 1);
    if (!s.has(d.toLocaleDateString("en-CA"))) return 0;
  }
  while (s.has(d.toLocaleDateString("en-CA"))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}
function PageHead({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-head">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action && <div className="page-head-action">{action}</div>}
    </div>
  );
}
function Dashboard() {
  const { user, solved, bookmarks, revisit, activeDays, attempts } = useStore(),
    pct = Math.round((solved.length / problems.length) * 100),
    next =
      topics.find((t) =>
        problems.some((p) => p.topicId === t.id && !solved.includes(p.id)),
      ) || topics[0],
    today = new Date().toLocaleDateString("en-CA"),
    streak = calcStreak(activeDays, today);
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - 6 + i);
    const key = d.toLocaleDateString("en-CA");
    return {
      key,
      day: d.toLocaleDateString("en", { weekday: "short" }),
      val: activeDays.includes(key)
        ? Math.max(1, solved.filter((_, j) => j % 7 === i).length)
        : 0,
    };
  });
  const first = problems.find((p) => !solved.includes(p.id));
  const potd =
    problems[(Math.floor(Date.now() / 86400000) + 37) % problems.length];
  return (
    <div className="content-wrap">
      <div className="dashboard-welcome">
        <div>
          <div className="eyebrow">
            {new Date().getHours() < 12
              ? "A FRESH START"
              : "YOUR PROGRESS, AT A GLANCE"}
          </div>
          <h1>
            Good{" "}
            {new Date().getHours() < 12
              ? "morning"
              : new Date().getHours() < 18
                ? "afternoon"
                : "evening"}
            , {user?.name?.split(" ")[0] || "climber"}{" "}
            <span className="wave">✦</span>
          </h1>
          <p>Small, steady steps are how big things happen.</p>
        </div>
        <Link className="btn btn-primary" to="/dsa">
          Continue learning <ArrowRight size={16} />
        </Link>
      </div>
      <div className="dash-stats">
        <div className="stat-card stat-primary">
          <div className="stat-top">
            <span className="stat-icon">
              <Code2 size={17} />
            </span>
            <span className="stat-trend">
              <Activity size={13} /> Your pace
            </span>
          </div>
          <div className="stat-number">
            {solved.length}
            <span> / {problems.length}</span>
          </div>
          <div className="stat-label">Problems solved</div>
          <div className="stat-track">
            <i style={{ width: pct + "%" }} />
          </div>
          <div className="stat-foot">{pct}% of your DSA roadmap</div>
        </div>
        <Link to="/streak" className="stat-card stat-streak">
          <div className="stat-top">
            <span className="stat-icon amber-bg">
              <Flame size={17} fill="currentColor" />
            </span>
            <span className="stat-subtle">BUILD YOUR MOMENTUM</span>
          </div>
          <div className="stat-number">
            {streak}
            <span> days</span>
          </div>
          <div className="stat-label">Current streak</div>
          <div className="stat-foot">
            {activeDays.includes(today)
              ? "You showed up today. Nice work!"
              : "One problem today keeps it going."}
          </div>
        </Link>
        <Link to="/aptitude" className="stat-card stat-aptitude">
          <div className="stat-top">
            <span className="stat-icon green-bg">
              <BookOpen size={17} />
            </span>
            <span className="stat-subtle">READY WHEN YOU ARE</span>
          </div>
          <div className="stat-number">
            {attempts.length}
            <span> tests</span>
          </div>
          <div className="stat-label">Aptitude practice</div>
          <div className="stat-foot">
            Build speed and accuracy at your pace <ArrowRight size={13} />
          </div>
        </Link>
      </div>
      <section className="potd-card card">
        <div className="potd-symbol">
          <Star size={17} fill="currentColor" />
        </div>
        <div className="potd-copy">
          <span className="eyebrow">
            PROBLEM OF THE DAY · {potd.difficulty.toUpperCase()}
          </span>
          <b>{potd.title}</b>
          <small>
            {topics.find((topic) => topic.id === potd.topicId)?.name} ·{" "}
            {potd.pattern}
          </small>
        </div>
        <a
          className="btn btn-soft"
          href={`https://leetcode.com/problems/${potd.leetcodeSlug}/`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Take a look <ExternalLink size={14} />
        </a>
      </section>
      <div className="dash-grid">
        <section className="card chart-card">
          <div className="card-heading">
            <div>
              <h2>Your weekly rhythm</h2>
              <p>Consistency matters more than intensity.</p>
            </div>
            <span className="card-heading-icon">
              <ChartNoAxesCombined size={17} />
            </span>
          </div>
          <div className="weekly-chart">
            {last7.map((d, i) => (
              <div className="week-column" key={d.key}>
                <div className="week-bar-bg">
                  <i
                    className={d.val ? "week-bar-active" : ""}
                    style={{ height: d.val ? "70%" : `${18 + (i % 3) * 8}%` }}
                  />
                </div>
                <small>{d.day}</small>
              </div>
            ))}
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-dot" /> Days you showed up
            </span>
            <span>Last 7 days</span>
          </div>
        </section>
        <section className="card continue-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">PICK UP WHERE YOU LEFT OFF</span>
              <h2>
                {first
                  ? topics.find((t) => t.id === first.topicId)?.name
                  : "Roadmap complete!"}
              </h2>
            </div>
            <div className="continue-icon">
              <Compass size={21} />
            </div>
          </div>
          <p>
            {first
              ? `Keep building your foundation with ${first.title}.`
              : "You've made it through the whole sheet. Amazing work."}
          </p>
          <div className="continue-meta">
            <span>
              <Layers size={14} />
              {first ? first.pattern : "All topics"}
            </span>
            <span className="difficulty easy">
              {first?.difficulty || "Complete"}
            </span>
          </div>
          <Link
            className="btn btn-primary btn-full"
            to={first ? `/dsa/${first.topicId}` : "/dsa"}
          >
            {first ? "Continue topic" : "Explore again"}{" "}
            <ArrowRight size={15} />
          </Link>
        </section>
        <section className="card recommendation-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">A GOOD NEXT STEP</span>
              <h2>Try something new</h2>
            </div>
            <div className="recommend-icon">
              <Star size={18} />
            </div>
          </div>
          <p>Explore {next.name}, a great next move in your interview prep.</p>
          <Link to={`/dsa/${next.id}`} className="recommend-row">
            <span className="recommend-number">
              {String(topics.indexOf(next) + 1).padStart(2, "0")}
            </span>
            <span>
              <b>{next.name}</b>
              <small>
                {problems.filter((p) => p.topicId === next.id).length} curated
                problems · {next.category}
              </small>
            </span>
            <ChevronRight size={17} />
          </Link>
        </section>
        <section className="card revision-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">COME BACK STRONGER</span>
              <h2>Your revision queue</h2>
            </div>
            <span className="queue-count">{revisit.length}</span>
          </div>
          {revisit.length === 0 ? (
            <div className="empty-state small-empty">
              <div className="empty-icon">
                <RotateCcw size={20} />
              </div>
              <b>A clear slate</b>
              <p>Flag a problem to revisit it later.</p>
              <Link to="/dsa">
                Browse problems <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="revision-list">
              {revisit.slice(0, 3).map((id) => {
                const p = problems.find((x) => x.id === id);
                return p ? (
                  <Link
                    to={`/dsa/${p.topicId}`}
                    key={id}
                    className="revision-row"
                  >
                    <span className="revision-dot" />
                    <b>{p.title}</b>
                    <span
                      className={"difficulty " + p.difficulty.toLowerCase()}
                    >
                      {p.difficulty}
                    </span>
                    <ChevronRight size={15} />
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </section>
        <section className="card bookmarks-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">SAVE FOR LATER</span>
              <h2>Bookmarked problems</h2>
            </div>
            <Bookmark size={17} className="muted-icon" />
          </div>
          {bookmarks.length === 0 ? (
            <div className="empty-state small-empty">
              <div className="empty-icon">
                <Bookmark size={20} />
              </div>
              <b>Keep the good ones close</b>
              <p>Bookmark problems to find them here.</p>
              <Link to="/dsa">
                Explore the sheet <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="revision-list">
              {bookmarks.slice(0, 3).map((id) => {
                const p = problems.find((x) => x.id === id);
                return p ? (
                  <Link
                    to={`/dsa/${p.topicId}`}
                    key={id}
                    className="revision-row"
                  >
                    <Bookmark size={14} className="bookmark-fill" />
                    <b>{p.title}</b>
                    <ChevronRight size={15} />
                  </Link>
                ) : null;
              })}
            </div>
          )}
        </section>
        <section className="card recent-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">YOUR RECENT ACTIVITY</span>
              <h2>Steps you’ve taken</h2>
            </div>
            <Activity size={17} className="muted-icon" />
          </div>
          {solved.length === 0 && attempts.length === 0 ? (
            <div className="empty-state small-empty">
              <div className="empty-icon">
                <Activity size={19} />
              </div>
              <b>Your story starts here</b>
              <p>
                Solve a problem or finish a practice test to see your activity.
              </p>
            </div>
          ) : (
            <div className="recent-list">
              {solved
                .slice(-3)
                .reverse()
                .map((id) => {
                  const item = problems.find((problem) => problem.id === id);
                  return item ? (
                    <Link key={id} to={`/dsa/${item.topicId}`}>
                      <span className="recent-check">
                        <Check size={12} />
                      </span>
                      <b>{item.title}</b>
                      <small>DSA · {item.difficulty}</small>
                    </Link>
                  ) : null;
                })}
              {attempts.slice(0, 2).map((attempt) => (
                <div className="recent-attempt" key={attempt.id}>
                  <span className="recent-test">
                    <Target size={12} />
                  </span>
                  <b>{attempt.topic}</b>
                  <small>
                    {attempt.score}/{attempt.total} points
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <div className="bottom-quote">
        <span>✳</span> The summit is built from the steps you take today.
      </div>
    </div>
  );
}
function ProgressRing({ value, size = 35 }: { value: number; size?: number }) {
  return (
    <div
      className="progress-ring"
      style={
        {
          width: size,
          height: size,
          "--progress": `${Math.min(value, 100)}%`,
        } as React.CSSProperties
      }
    >
      <span>{value}%</span>
    </div>
  );
}
function DsaRoadmap() {
  const { solved } = useStore(),
    [query, setQuery] = useState(""),
    [group, setGroup] = useState("All topics");
  const groups = [
    "All topics",
    "Foundations",
    "Data structures",
    "Problem solving",
  ];
  const filtered = topics.filter(
    (t) =>
      (group === "All topics" || t.category === group) &&
      (t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.description.toLowerCase().includes(query.toLowerCase())),
  );
  return (
    <div className="content-wrap roadmap-layout">
      <aside className="topic-sidebar">
        <div className="topic-side-head">
          <b>DSA ROADMAP</b>
          <span>{topics.length} topics</span>
        </div>
        <div className="topic-side-links">
          {topics.map((t, i) => {
            const all = problems.filter((p) => p.topicId === t.id),
              n = all.filter((p) => solved.includes(p.id)).length;
            return (
              <Link key={t.id} to={`/dsa/${t.id}`} className="topic-side-link">
                <ProgressRing
                  value={all.length ? Math.round((n / all.length) * 100) : 0}
                  size={30}
                />
                <span>
                  {String(i + 1).padStart(2, "0")} {t.name}
                </span>
              </Link>
            );
          })}
        </div>
      </aside>
      <div className="roadmap-main">
        <PageHead
          eyebrow="THE ROADMAP"
          title="DSA, one pattern at a time."
          description="A thoughtful path through the patterns that show up in interviews."
          action={
            <span className="roadmap-count">
              <Code2 size={16} />
              {solved.length} of {problems.length} complete
            </span>
          }
        />
        <div className="overall-card">
          <div className="overall-copy">
            <div>
              <span className="eyebrow">YOUR OVERALL PROGRESS</span>
              <h2>
                {solved.length}
                <small> / {problems.length}</small> <span>problems solved</span>
              </h2>
            </div>
            <ProgressRing
              value={Math.round((solved.length / problems.length) * 100)}
              size={62}
            />
          </div>
          <div className="overall-track">
            <i
              style={{ width: `${(solved.length / problems.length) * 100}%` }}
            />
          </div>
          <div className="overall-foot">
            <span>Keep showing up. It adds up.</span>
            <div className="diff-breakdown">
              <span>
                <i className="dot-easy" />
                {
                  problems.filter(
                    (p) => p.difficulty === "Easy" && solved.includes(p.id),
                  ).length
                }{" "}
                Easy
              </span>
              <span>
                <i className="dot-medium" />
                {
                  problems.filter(
                    (p) => p.difficulty === "Medium" && solved.includes(p.id),
                  ).length
                }{" "}
                Medium
              </span>
              <span>
                <i className="dot-hard" />
                {
                  problems.filter(
                    (p) => p.difficulty === "Hard" && solved.includes(p.id),
                  ).length
                }{" "}
                Hard
              </span>
            </div>
          </div>
        </div>
        <div className="roadmap-toolbar">
          <div className="search-field">
            <Search size={16} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find a topic..."
            />
          </div>
          <div className="filter-pills">
            {groups.map((g) => (
              <button
                key={g}
                className={group === g ? "selected" : ""}
                onClick={() => setGroup(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div className="topic-grid">
          {filtered.map((t, i) => {
            const ps = problems.filter((p) => p.topicId === t.id),
              n = ps.filter((p) => solved.includes(p.id)).length,
              diff = ["Easy", "Medium", "Hard"].map(
                (d) => ps.filter((p) => p.difficulty === d).length,
              );
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 9 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.025 }}
              >
                <Link to={`/dsa/${t.id}`} className="topic-card">
                  <div className="topic-card-top">
                    <span className="topic-index">
                      {String(topics.indexOf(t) + 1).padStart(2, "0")}
                    </span>
                    <ProgressRing
                      value={ps.length ? Math.round((n / ps.length) * 100) : 0}
                    />
                  </div>
                  <h3>{t.name}</h3>
                  <p>{t.description}</p>
                  <div className="topic-progress-line">
                    <div className="progress-track">
                      <i
                        style={{
                          width: `${ps.length ? (n / ps.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span>
                      {n}/{ps.length}
                    </span>
                  </div>
                  <div className="topic-card-bottom">
                    <div className="topic-diff">
                      <span>
                        <i className="dot-easy" />
                        {diff[0]}
                      </span>
                      <span>
                        <i className="dot-medium" />
                        {diff[1]}
                      </span>
                      <span>
                        <i className="dot-hard" />
                        {diff[2]}
                      </span>
                    </div>
                    <ChevronRight size={16} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
const filters = ["All", "Easy", "Medium", "Hard"];
function TopicPage() {
  const { topicId } = useParams(),
    topic = topics.find((t) => t.id === topicId);
  const { solved, bookmarks, revisit, notes, toggle, note, markSession } =
    useStore();
  const [query, setQuery] = useState(""),
    [difficulty, setDifficulty] = useState("All"),
    [status, setStatus] = useState("All problems"),
    [company, setCompany] = useState("All companies"),
    [pattern, setPattern] = useState("All patterns"),
    [sort, setSort] = useState(true),
    [open, setOpen] = useState<string[]>([]),
    [noteOpen, setNoteOpen] = useState<string | null>(null);
  if (!topic) return <NotFound />;
  const all = problems.filter((p) => p.topicId === topic.id);
  const companies = [...new Set(all.flatMap((p) => p.companies))].sort();
  const passing = all
    .filter(
      (p) =>
        (difficulty === "All" || p.difficulty === difficulty) &&
        (status === "All problems" ||
          (status === "Solved"
            ? solved.includes(p.id)
            : status === "Unsolved"
              ? !solved.includes(p.id)
              : status === "Bookmarked"
                ? bookmarks.includes(p.id)
                : revisit.includes(p.id))) &&
        (company === "All companies" || p.companies.includes(company)) &&
        (pattern === "All patterns" || p.pattern === pattern) &&
        (p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.companies.some((c) =>
            c.toLowerCase().includes(query.toLowerCase()),
          ) ||
          p.pattern.toLowerCase().includes(query.toLowerCase())),
    )
    .sort((a, b) =>
      sort ? b.importance - a.importance : a.title.localeCompare(b.title),
    );
  const byPattern = topic.patterns
    .map((p) => ({ ...p, items: passing.filter((x) => x.pattern === p.name) }))
    .filter((p) => p.items.length);
  function solvedToggle(id: string) {
    toggle("solved", id);
    if (!solved.includes(id)) markSession();
    void saveProgress().catch(console.error);
  }
  const continueP = all.find((p) => !solved.includes(p.id));
  return (
    <div className="content-wrap topic-page">
      <div className="breadcrumb">
        <Link to="/dsa">DSA Roadmap</Link>
        <ChevronRight size={14} />
        <span>{topic.name}</span>
      </div>
      <PageHead
        eyebrow={`${String(topics.indexOf(topic) + 1).padStart(2, "0")} / ${topic.category.toUpperCase()}`}
        title={topic.name}
        description={topic.description}
        action={
          continueP ? (
            <a
              className="btn btn-primary"
              href={`https://leetcode.com/problems/${continueP.leetcodeSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Continue with a problem <ExternalLink size={15} />
            </a>
          ) : (
            <span className="complete-pill">
              <CheckCircle2 size={16} />
              Topic complete
            </span>
          )
        }
      />
      <div className="topic-summary card">
        <div>
          <div className="summary-label">YOUR PROGRESS</div>
          <b className="summary-big">
            {all.filter((p) => solved.includes(p.id)).length}
            <small> / {all.length}</small>
          </b>
          <span className="summary-caption">problems solved</span>
        </div>
        <ProgressRing
          value={
            all.length
              ? Math.round(
                  (all.filter((p) => solved.includes(p.id)).length /
                    all.length) *
                    100,
                )
              : 0
          }
          size={56}
        />
        <div className="summary-divider" />
        <div className="summary-difficulty">
          {filters.slice(1).map((d) => (
            <span key={d}>
              <i className={`dot-${d.toLowerCase()}`} />
              {all.filter((p) => p.difficulty === d).length} {d}
            </span>
          ))}
        </div>
      </div>
      <div className="topic-filters">
        <div className="search-field">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search problems, companies..."
          />
        </div>
        <select
          aria-label="Filter by difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {filters.map((f) => (
            <option key={f} value={f}>
              {f === "All" ? "All difficulties" : f}
            </option>
          ))}
        </select>
        <select
          aria-label="Filter by progress"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {[
            "All problems",
            "Solved",
            "Unsolved",
            "Bookmarked",
            "Revisit later",
          ].map((f) => (
            <option key={f}>{f}</option>
          ))}
        </select>
        <select
          aria-label="Filter by company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option>All companies</option>
          {companies.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          aria-label="Filter by pattern"
          value={pattern}
          onChange={(e) => setPattern(e.target.value)}
        >
          <option>All patterns</option>
          {topic.patterns.map((p) => (
            <option key={p.name}>{p.name}</option>
          ))}
        </select>
        <button className="sort-button" onClick={() => setSort((x) => !x)}>
          <ArrowDownWideNarrow size={15} />
          {sort ? "Importance" : "Title"}
        </button>
      </div>
      {all.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-icon">
            <BookOpen />
          </div>
          <h3>Problems are on their way</h3>
          <p>This topic is part of your roadmap. Check back soon.</p>
        </div>
      ) : byPattern.length === 0 ? (
        <div className="empty-state card">
          <div className="empty-icon">
            <Search />
          </div>
          <h3>No matches just yet</h3>
          <p>Try adjusting your search or filters.</p>
          <button
            className="btn btn-soft"
            onClick={() => {
              setQuery("");
              setDifficulty("All");
              setStatus("All problems");
              setCompany("All companies");
              setPattern("All patterns");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="pattern-list">
          {byPattern.map((p, pi) => {
            const count = all.filter((x) => x.pattern === p.name).length,
              done = all.filter(
                (x) => x.pattern === p.name && solved.includes(x.id),
              ).length,
              isOpen = open.length === 0 || open.includes(p.name);
            return (
              <section className="pattern-card" key={p.name}>
                <button
                  className="pattern-heading"
                  onClick={() =>
                    setOpen((v) =>
                      v.includes(p.name)
                        ? v.filter((x) => x !== p.name)
                        : [...v, p.name],
                    )
                  }
                  aria-expanded={isOpen}
                >
                  <span className="pattern-num">0{pi + 1}</span>
                  <span className="pattern-name">
                    <b>{p.name}</b>
                    <small>{p.tip}</small>
                  </span>
                  <span className="pattern-progress">
                    <ProgressRing
                      value={count ? Math.round((done / count) * 100) : 0}
                    />
                    <span>
                      {done}/{count}
                    </span>
                  </span>
                  {isOpen ? (
                    <ChevronDown size={17} />
                  ) : (
                    <ChevronRight size={17} />
                  )}
                </button>
                {isOpen && (
                  <div className="problem-list">
                    {p.items.map((pr) => (
                      <ProblemRow
                        key={pr.id}
                        problem={pr}
                        solved={solved.includes(pr.id)}
                        bookmarked={bookmarks.includes(pr.id)}
                        revisit={revisit.includes(pr.id)}
                        note={notes[pr.id] || ""}
                        noteOpen={noteOpen === pr.id}
                        onSolved={() => solvedToggle(pr.id)}
                        onBookmark={() => {
                          toggle("bookmarks", pr.id);
                          void saveProgress().catch(console.error);
                        }}
                        onRevisit={() => {
                          toggle("revisit", pr.id);
                          void saveProgress().catch(console.error);
                        }}
                        onNote={() =>
                          setNoteOpen(noteOpen === pr.id ? null : pr.id)
                        }
                        onNoteChange={(v) => {
                          note(pr.id, v);
                          void saveProgress().catch(console.error);
                        }}
                      />
                    ))}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
function ProblemRow({
  problem: p,
  solved,
  bookmarked,
  revisit,
  note,
  noteOpen,
  onSolved,
  onBookmark,
  onRevisit,
  onNote,
  onNoteChange,
}: {
  problem: Problem;
  solved: boolean;
  bookmarked: boolean;
  revisit: boolean;
  note: string;
  noteOpen: boolean;
  onSolved: () => void;
  onBookmark: () => void;
  onRevisit: () => void;
  onNote: () => void;
  onNoteChange: (s: string) => void;
}) {
  return (
    <div className={"problem-wrap " + (solved ? "is-solved" : "")}>
      <div className="problem-row">
        <label
          className="problem-check"
          title={solved ? "Mark unsolved" : "Mark solved"}
        >
          <input type="checkbox" checked={solved} onChange={onSolved} />
          <span>
            <Check size={12} />
          </span>
        </label>
        <div className="problem-main">
          <a
            href={`https://leetcode.com/problems/${p.leetcodeSlug}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="problem-title"
          >
            {p.title}
            <ExternalLink size={12} />
          </a>
          <div className="company-chips">
            {p.companies.map((c) => (
              <span key={c}>{c}</span>
            ))}
          </div>
        </div>
        <span className={"difficulty " + p.difficulty.toLowerCase()}>
          {p.difficulty}
        </span>
        <button
          onClick={onRevisit}
          className={"row-action " + (revisit ? "action-on" : "")}
          title={revisit ? "Remove from revision queue" : "Revisit later"}
          aria-label={revisit ? "Remove from revision queue" : "Revisit later"}
        >
          <RotateCcw size={16} />
        </button>
        <button
          onClick={onBookmark}
          className={"row-action " + (bookmarked ? "action-bookmark" : "")}
          title={bookmarked ? "Remove bookmark" : "Bookmark"}
          aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
        >
          <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
        </button>
        <button
          onClick={onNote}
          className={"row-action " + (note ? "action-note" : "")}
          title="Personal note"
          aria-label="Personal note"
        >
          <FileText size={16} />
        </button>
      </div>
      {noteOpen && (
        <div className="note-editor">
          <FileText size={15} />
          <textarea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            placeholder="Add a thought, approach, or reminder..."
            rows={2}
          />
          <button className="btn btn-soft btn-sm" onClick={onNote}>
            Done
          </button>
        </div>
      )}
    </div>
  );
}
function Aptitude() {
  const [length, setLength] = useState(10);
  return (
    <div className="content-wrap">
      <PageHead
        eyebrow="BUILD YOUR EDGE"
        title="Aptitude, made approachable."
        description="Learn the idea, practice the method, and grow your confidence one question at a time."
      />
      <div className="apt-hero card">
        <div>
          <div className="eyebrow">A LITTLE PRACTICE GOES A LONG WAY</div>
          <h2>Ready for a quick challenge?</h2>
          <p>
            Take a mixed mock test across quantitative, reasoning and verbal
            skills.
          </p>
        </div>
        <div className="mixed-start">
          <label className="sr-only" htmlFor="mock-length">
            Mock question count
          </label>
          <select
            id="mock-length"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
          >
            <option value={10}>10 questions</option>
            <option value={20}>20 questions</option>
            <option value={30}>30 questions</option>
          </select>
          <Link className="btn btn-primary" to={`/test/mixed?length=${length}`}>
            Start a mixed mock <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="apt-group-heading">
        <div>
          <h2>Choose a learning path</h2>
          <p>Every topic pairs a clear explanation with a practice test.</p>
        </div>
        <span>{aptitudeTopics.length} paths</span>
      </div>
      <div className="apt-grid">
        {aptitudeTopics.map((t, i) => (
          <Link key={t.id} to={`/aptitude/${t.id}`} className="apt-card">
            <div className="apt-card-top">
              <span className="apt-symbol">{t.icon}</span>
              <span className="apt-order">0{i + 1}</span>
            </div>
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <div className="apt-card-footer">
              <span>
                <BookOpen size={14} />
                Learn & practice
              </span>
              <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>
      <section className="apt-interview card">
        <div className="interview-icon">
          <GraduationCap size={21} />
        </div>
        <div>
          <span className="eyebrow">BEYOND THE TEST</span>
          <h3>Show up confidently in interviews.</h3>
          <p>
            Get practical guidance for introducing yourself, presenting your
            work, and navigating group discussions.
          </p>
        </div>
        <button
          className="btn btn-soft"
          onClick={() => (window.location.hash = "interview")}
        >
          Explore interview prep <ArrowRight size={15} />
        </button>
      </section>
    </div>
  );
}
function AptitudeTopic() {
  const { topicId } = useParams(),
    topic = aptitudeTopics.find((t) => t.id === topicId);
  const [tab, setTab] = useState<"learn" | "practice">("learn");
  if (!topic) return <NotFound />;
  return (
    <div className="content-wrap">
      <div className="breadcrumb">
        <Link to="/aptitude">Aptitude</Link>
        <ChevronRight size={14} />
        <span>{topic.name}</span>
      </div>
      <PageHead
        eyebrow="YOUR LEARNING PATH"
        title={topic.name}
        description={topic.description}
      />
      <div className="tabbar">
        <button
          onClick={() => setTab("learn")}
          className={tab === "learn" ? "tab-active" : ""}
        >
          <BookOpen size={16} />
          Learn
        </button>
        <button
          onClick={() => setTab("practice")}
          className={tab === "practice" ? "tab-active" : ""}
        >
          <Target size={16} />
          Practice test
        </button>
      </div>
      {tab === "learn" ? (
        <LearnContent topic={topic} />
      ) : (
        <div className="practice-start card">
          <div className="practice-start-icon">
            <Target size={23} />
          </div>
          <div className="eyebrow">READY WHEN YOU ARE</div>
          <h2>Put what you know into practice.</h2>
          <p>
            A short, timed quiz helps you apply the ideas and spot what to
            review next.
          </p>
          <div className="practice-specs">
            <span>
              <CheckCircle2 size={15} />
              Multiple choice
            </span>
            <span>
              <Clock3 size={15} />
              Timed questions
            </span>
            <span>
              <Lightbulb size={15} />
              Step-by-step explanations
            </span>
          </div>
          <Link to={`/test/${topic.id}`} className="btn btn-primary btn-lg">
            Start practice <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}
function TestEngine() {
  const { topicId } = useParams(),
    nav = useNavigate();
  const topic = aptitudeTopics.find((t) => t.id === topicId),
    isMixed = topicId === "mixed";
  const record = useStore((s) => s.recordAttempt);
  const [searchParams] = useSearchParams();
  const requested = Number(searchParams.get("length")) || 15;
  const topicIds =
    topicId === "quantitative"
      ? [
          "percentages",
          "profit-loss",
          "time-work",
          "time-speed-distance",
          "ratio",
          "probability",
        ]
      : topicId === "logical"
        ? ["series", "blood-relations"]
        : topicId === "verbal"
          ? ["verbal"]
          : topicId === "interview"
            ? ["interview-etiquette"]
            : [];
  const qs = useMemo(() => {
    const pool =
      topicId === "mixed"
        ? aptitudeQuestions
        : aptitudeQuestions.filter((q) => topicIds.includes(q.topicId));
    return [...pool]
      .sort(() => Math.random() - 0.5)
      .slice(
        0,
        Math.min(
          topicId === "mixed" ? requested : 15,
          aptitudeQuestions.length,
        ),
      );
  }, [topicId, requested]);
  const [index, setIndex] = useState(0),
    [questionSeconds, setQuestionSeconds] = useState(60),
    [questionTimes, setQuestionTimes] = useState<Record<number, number>>({}),
    [answers, setAnswers] = useState<Record<number, number>>({}),
    [review, setReview] = useState<number[]>([]),
    [negative, setNegative] = useState(false),
    [seconds, setSeconds] = useState(Math.max(300, qs.length * 60)),
    [confirm, setConfirm] = useState(false);
  const questionStartedAt = useRef(Date.now());
  function goToQuestion(next: number) {
    setQuestionTimes((times) => ({
      ...times,
      [index]: Math.max(
        0,
        Math.floor((Date.now() - questionStartedAt.current) / 1000),
      ),
    }));
    questionStartedAt.current = Date.now();
    setIndex(next);
  }
  useEffect(() => {
    if (!qs.length) return;
    const t = setInterval(
      () =>
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(t);
            submit();
            return 0;
          }
          return s - 1;
        }),
      1000,
    );
    return () => clearInterval(t);
  }, [topicId, nav, answers, negative, qs.length, record]);
  useEffect(() => {
    if (!qs.length) return;
    setQuestionSeconds(60);
    const timer = setInterval(() => {
      setQuestionSeconds((remaining) => {
        if (remaining <= 1) {
          clearInterval(timer);
          setQuestionTimes((times) => ({ ...times, [index]: 60 }));
          setIndex((current) => {
            if (current < qs.length - 1) {
              questionStartedAt.current = Date.now();
              return current + 1;
            }
            setConfirm(true);
            return current;
          });
          return 0;
        }
        return remaining - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [index, qs.length]);
  const q = qs[index];
  function submit() {
    const finalQuestionTimes = {
      ...questionTimes,
      [index]: Math.max(
        0,
        Math.floor((Date.now() - questionStartedAt.current) / 1000),
      ),
    };
    const correct = qs.filter(
      (item, i) => answers[i] === item.correctIndex,
    ).length;
    const wrong = qs.filter(
      (item, i) => answers[i] !== undefined && answers[i] !== item.correctIndex,
    ).length;
    const score = Math.max(0, correct - (negative ? wrong * 0.25 : 0));
    record({
      topic: topic?.name || "Mixed mock",
      score,
      total: qs.length,
      accuracy: Math.round((correct / Math.max(qs.length, 1)) * 100),
      duration: Math.max(0, qs.length * 60 - seconds),
    });
    void saveProgress();
    nav(`/test/${topicId}/result`, {
      state: {
        answers,
        negative,
        total: qs.length,
        questionIds: qs.map((question) => question.id),
        questionTimes: finalQuestionTimes,
        topicName: topic?.name || "Mixed mock",
      },
    });
  }
  if (!qs.length)
    return (
      <div className="content-wrap test-page">
        <Link to="/aptitude" className="back-link">
          <ArrowLeft size={15} /> Back to aptitude
        </Link>
        <div className="practice-start card">
          <div className="practice-start-icon">
            <BookOpen size={22} />
          </div>
          <div className="eyebrow">COMING SOON</div>
          <h2>This practice set is being prepared.</h2>
          <p>
            The learning path is ready to explore. Practice questions for this
            topic will appear here when they are complete.
          </p>
          <Link className="btn btn-primary" to="/aptitude">
            Choose another path <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    );
  return (
    <div className="content-wrap test-page">
      <div className="test-top">
        <Link
          to={isMixed ? "/aptitude" : `/aptitude/${topicId}`}
          className="back-link"
        >
          <ArrowLeft size={15} /> Exit test
        </Link>
        <span className="test-topic-label">
          {topic?.name || "Mixed mock test"}
        </span>
        <span className="test-clock">
          <Clock3 size={16} />
          {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
        </span>
      </div>
      <div className="test-layout">
        <section className="test-question card">
          <div className="test-question-meta">
            <span>
              QUESTION {String(index + 1).padStart(2, "0")} <i>/ {qs.length}</i>
            </span>
            <span
              className={
                "difficulty " + (q?.difficulty || "Medium").toLowerCase()
              }
            >
              {q?.difficulty || "Medium"}
            </span>
            <span className="question-clock">
              <Clock3 size={13} />
              {questionSeconds}s
            </span>
          </div>
          <div className="question-progress">
            <i style={{ width: `${((index + 1) / qs.length) * 100}%` }} />
          </div>
          <h1>{q?.question}</h1>
          <div className="answer-options">
            {q?.options.map((o, i) => (
              <button
                key={i}
                onClick={() => setAnswers((a) => ({ ...a, [index]: i }))}
                className={
                  "answer-option " +
                  (answers[index] === i ? "answer-selected" : "")
                }
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + i)}
                </span>
                {o}
                {answers[index] === i && <CheckCircle2 size={17} />}
              </button>
            ))}
          </div>
          <div className="test-question-controls">
            <button
              className={
                "review-toggle " + (review.includes(index) ? "review-on" : "")
              }
              onClick={() =>
                setReview((r) =>
                  r.includes(index)
                    ? r.filter((x) => x !== index)
                    : [...r, index],
                )
              }
            >
              <Star
                size={15}
                fill={review.includes(index) ? "currentColor" : "none"}
              />
              {review.includes(index) ? "Marked for review" : "Mark for review"}
            </button>
            <div>
              <button
                className="btn btn-soft"
                disabled={index === 0}
                onClick={() => goToQuestion(index - 1)}
              >
                <ArrowLeft size={15} /> Previous
              </button>
              <button
                className="btn btn-primary"
                onClick={() =>
                  index === qs.length - 1
                    ? setConfirm(true)
                    : goToQuestion(index + 1)
                }
              >
                {index === qs.length - 1 ? "Review & submit" : "Next question"}{" "}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </section>
        <aside className="test-sidebar card">
          <div className="test-side-title">
            <b>Question palette</b>
            <span>
              {Object.keys(answers).length}/{qs.length} answered
            </span>
          </div>
          <div className="question-palette">
            {qs.map((_, i) => (
              <button
                key={i}
                aria-label={`Question ${i + 1}${answers[i] !== undefined ? ", answered" : ""}`}
                className={`${i === index ? "palette-current" : ""} ${answers[i] !== undefined ? "palette-answered" : ""} ${review.includes(i) ? "palette-review" : ""}`}
                onClick={() => goToQuestion(i)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="palette-legend">
            <span>
              <i className="legend-unanswered" />
              Unanswered
            </span>
            <span>
              <i className="legend-answered" />
              Answered
            </span>
            <span>
              <i className="legend-review" />
              Review
            </span>
          </div>
          <label className="negative-toggle">
            <span>
              <b>Negative marking</b>
              <small>−0.25 per incorrect answer</small>
            </span>
            <input
              type="checkbox"
              checked={negative}
              onChange={(e) => setNegative(e.target.checked)}
            />
            <i />
          </label>
          <button
            className="btn btn-primary btn-full"
            onClick={() => setConfirm(true)}
          >
            Submit test <CheckCircle2 size={16} />
          </button>
        </aside>
      </div>
      {confirm && (
        <div className="modal-backdrop">
          <div className="confirm-modal">
            <button
              className="modal-close icon-button"
              onClick={() => setConfirm(false)}
              aria-label="Close"
            >
              <X size={18} />
            </button>
            <div className="confirm-icon">
              <CheckCircle2 size={22} />
            </div>
            <h2>Ready to wrap up?</h2>
            <p>
              You’ve answered {Object.keys(answers).length} of {qs.length}{" "}
              questions.{" "}
              {qs.length - Object.keys(answers).length > 0
                ? `${qs.length - Object.keys(answers).length} are still unanswered.`
                : "Everything is answered."}
            </p>
            <div className="confirm-actions">
              <button
                className="btn btn-soft"
                onClick={() => setConfirm(false)}
              >
                Keep working
              </button>
              <button className="btn btn-primary" onClick={submit}>
                Submit test <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function TestResult() {
  const { topicId } = useParams(),
    nav = useNavigate();
  const [state] = useState(() => {
    const raw = window.history.state?.usr;
    return (
      raw || { answers: {}, negative: false, total: aptitudeQuestions.length }
    );
  });
  const qs = state.questionIds
      ? (state.questionIds as string[])
          .map((id) =>
            aptitudeQuestions.find((question) => question.id === id)!,
          )
          .filter(Boolean)
      : aptitudeQuestions.slice(0, state.total || 4),
    answers = state.answers as Record<number, number>,
    correct = qs.filter((q, i) => answers[i] === q.correctIndex).length,
    wrong = qs.filter(
      (q, i) => answers[i] !== undefined && answers[i] !== q.correctIndex,
    ).length,
    score = Math.max(0, correct - (state.negative ? wrong * 0.25 : 0)),
    pct = Math.round((score / Math.max(qs.length, 1)) * 100),
    review =
      topicId === "mixed"
        ? "Mixed mock"
        : aptitudeTopics.find((t) => t.id === topicId)?.name || "Practice";
  const attempts = useStore((store) => store.attempts);
  const best = Math.max(
    0,
    ...attempts
      .filter((attempt) => attempt.topic === review)
      .map((attempt) => attempt.score),
  );
  return (
    <div className="content-wrap result-page">
      <Link className="back-link" to="/aptitude">
        <ArrowLeft size={15} /> Back to aptitude
      </Link>
      <div className="result-hero card">
        <div className="result-medal">
          <Trophy size={29} />
        </div>
        <div className="eyebrow">PRACTICE COMPLETE</div>
        <h1>
          {pct >= 80
            ? "A strong showing."
            : pct >= 50
              ? "Nice progress."
              : "Every attempt teaches you something."}
        </h1>
        <p>
          You finished the {review} practice. Take a moment to see what clicked
          and what to revisit.
        </p>
        <div className="result-score">
          <b>{score}</b>
          <span>/ {qs.length} points</span>
        </div>
      </div>
      <div className="result-stats">
        <div className="result-stat card">
          <span className="result-stat-icon green-bg">
            <CheckCircle2 size={17} />
          </span>
          <b>{correct}</b>
          <small>Correct answers</small>
        </div>
        <div className="result-stat card">
          <span className="result-stat-icon red-bg">
            <X size={17} />
          </span>
          <b>{wrong}</b>
          <small>To review</small>
        </div>
        <div className="result-stat card">
          <span className="result-stat-icon violet-bg">
            <ChartNoAxesCombined size={17} />
          </span>
          <b>{pct}%</b>
          <small>Accuracy</small>
        </div>
        <div className="result-stat card">
          <span className="result-stat-icon amber-bg">
            <Trophy size={17} />
          </span>
          <b>{best}</b>
          <small>Best score</small>
        </div>
      </div>
      <section className="card answer-review">
        <div className="card-heading">
          <div>
            <span className="eyebrow">LEARN FROM EACH ONE</span>
            <h2>Answer review</h2>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => nav(`/test/${topicId}`)}
          >
            Try again <RotateCcw size={15} />
          </button>
        </div>
        {qs.map((q, i) => (
          <article key={q.question} className="review-question">
            <div className="review-q-head">
              <span
                className={
                  answers[i] === q.correctIndex
                    ? "review-correct"
                    : "review-incorrect"
                }
              >
                {answers[i] === q.correctIndex ? (
                  <Check size={14} />
                ) : (
                  <X size={14} />
                )}
                Question {i + 1}
              </span>
              <b>{q.question}</b>
            </div>
            <p>
              <strong>Your answer:</strong>{" "}
              {answers[i] === undefined
                ? "Not answered"
                : q.options[answers[i]]}
            </p>
            <p>
              <strong>Correct answer:</strong> {q.options[q.correctIndex]}
            </p>
            <p>
              <strong>Time used:</strong>{" "}
              {(state.questionTimes as Record<number, number> | undefined)?.[
                i
              ] ?? 0}{" "}
              seconds
            </p>
            <div className="review-explanation">
              <Lightbulb size={15} />
              {q.explanation}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
function Profile() {
  const { user, solved, bookmarks, revisit, setUser } = useStore(),
    [name, setName] = useState(user?.name || ""),
    [college, setCollege] = useState(user?.college || ""),
    [target, setTarget] = useState(user?.target || "Software Engineer"),
    [saved, setSaved] = useState(false);
  const percent = Math.round((solved.length / problems.length) * 100);
  return (
    <div className="content-wrap">
      <PageHead
        eyebrow="YOUR SPACE"
        title="Profile & goals"
        description="A little context helps make this journey yours."
      />
      <div className="profile-grid">
        <section className="card profile-card">
          <div className="profile-cover">
            <div className="profile-big-avatar">
              {(user?.name || "G")
                .split(" ")
                .map((x) => x[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </div>
          </div>
          <div className="profile-body">
            <span className="eyebrow">YOUR ACCOUNT</span>
            <h2>{user?.name}</h2>
            <p>{user?.email || "Guest mode · saved on this device"}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setUser({ ...user!, name, college, target });
                setSaved(true);
                setTimeout(() => setSaved(false), 2400);
              }}
              className="profile-form"
            >
              <label>
                Display name
                <input value={name} onChange={(e) => setName(e.target.value)} />
              </label>
              <label>
                College <span className="optional">OPTIONAL</span>
                <input
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  placeholder="Your university or college"
                />
              </label>
              <label>
                Target role
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                >
                  {[
                    "Software Engineer",
                    "Frontend Developer",
                    "Backend Developer",
                    "Data Engineer",
                    "Product Engineer",
                    "Still exploring",
                  ].map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
              <button className="btn btn-primary" type="submit">
                {saved ? "Saved!" : "Save changes"} <Check size={15} />
              </button>
            </form>
            <button className="logout-button" onClick={() => void logout()}>
              <LogOut size={15} />
              Log out
            </button>
          </div>
        </section>
        <div className="profile-side">
          <section className="card profile-progress">
            <div className="card-heading">
              <div>
                <span className="eyebrow">YOUR JOURNEY SO FAR</span>
                <h2>Progress overview</h2>
              </div>
              <ProgressRing value={percent} size={48} />
            </div>
            <div className="profile-progress-stat">
              <b>{solved.length}</b>
              <span>problems solved</span>
            </div>
            <div className="progress-track">
              <i style={{ width: percent + "%" }} />
            </div>
            <p>{percent}% of the DSA roadmap complete</p>
          </section>
          <div className="profile-stat-grid">
            <div className="card profile-mini-stat">
              <Bookmark size={16} />
              <b>{bookmarks.length}</b>
              <small>Bookmarks</small>
            </div>
            <div className="card profile-mini-stat">
              <RotateCcw size={16} />
              <b>{revisit.length}</b>
              <small>To revisit</small>
            </div>
          </div>
          <section className="card profile-goal">
            <div className="goal-icon">
              <Target size={19} />
            </div>
            <div>
              <span className="eyebrow">YOUR TARGET</span>
              <h3>{target}</h3>
              <p>Keep your goal in sight. Every session moves you closer.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
function StreakPage() {
  const { activeDays } = useStore(),
    today = new Date().toLocaleDateString("en-CA"),
    streak = calcStreak(activeDays, today);
  const date = new Date(),
    month = date.getMonth(),
    year = date.getFullYear(),
    firstDay = new Date(year, month, 1).getDay(),
    daysInMonth = new Date(year, month + 1, 0).getDate(),
    monthName = date.toLocaleDateString("en", {
      month: "long",
      year: "numeric",
    }),
    history = Array.from({ length: 364 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (363 - i));
      return { key: d.toLocaleDateString("en-CA"), day: d.getDay() };
    });
  const longest = (() => {
    const s = [...activeDays].sort();
    let best = 0,
      run = 0,
      last = "";
    for (const x of s) {
      const d = new Date(x + "T12:00:00"),
        prev = new Date(last + "T12:00:00");
      if (last && Math.round((d.getTime() - prev.getTime()) / 86400000) === 1)
        run++;
      else run = 1;
      best = Math.max(best, run);
      last = x;
    }
    return Math.max(best, streak);
  })();
  return (
    <div className="content-wrap">
      <PageHead
        eyebrow="SHOWING UP IS A SUPERPOWER"
        title="Your streak"
        description="A streak is a reminder of the days you made time for your goals."
      />
      <div className="streak-hero card">
        <div className="streak-flame">
          <Flame size={35} fill="currentColor" />
        </div>
        <div>
          <div className="eyebrow">YOUR CURRENT STREAK</div>
          <div className="streak-count">
            {streak}
            <span> {streak === 1 ? "day" : "days"}</span>
          </div>
          <p>
            {activeDays.includes(today)
              ? "You showed up today. Keep that feeling close."
              : "Solve one problem or complete a practice test to keep your streak going."}
          </p>
        </div>
        <div className="streak-total">
          <Flame size={18} fill="currentColor" />
          <b>{longest}</b>
          <small>longest streak</small>
        </div>
      </div>
      <div className="streak-panels">
        <section className="card calendar-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">YOUR CONSISTENCY</span>
              <h2>{monthName}</h2>
            </div>
            <span className="calendar-status">
              <i className="legend-dot" />
              {activeDays.length} active days
            </span>
          </div>
          <div className="month-grid">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <span className="month-weekday" key={d}>
                {d}
              </span>
            ))}
            {Array.from({ length: firstDay }, (_, i) => (
              <span key={"blank" + i} />
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => {
              const d = i + 1,
                dt = new Date(year, month, d).toLocaleDateString("en-CA");
              return (
                <span
                  key={d}
                  className={`month-day ${activeDays.includes(dt) ? "day-active" : ""} ${dt === today ? "day-today" : ""}`}
                >
                  {d}
                </span>
              );
            })}
          </div>
        </section>
        <section className="card heatmap-card">
          <div className="card-heading">
            <div>
              <span className="eyebrow">THE LONG VIEW</span>
              <h2>Your past year</h2>
            </div>
            <span className="heatmap-total">
              {activeDays.length} active days
            </span>
          </div>
          <div className="heatmap-scroll">
            <div className="heatmap-grid">
              {history.map((d) => (
                <i
                  title={`${d.key}${activeDays.includes(d.key) ? " · active" : ""}`}
                  key={d.key}
                  className={activeDays.includes(d.key) ? "heat-active" : ""}
                  style={{ gridRow: d.day + 1 }}
                />
              ))}
            </div>
          </div>
          <div className="heatmap-legend">
            <span>Less</span>
            <i />
            <i className="heat-active" />
            <i className="heat-active heat-strong" />
            <span>More</span>
          </div>
        </section>
      </div>
      <div className="streak-note">
        <Flame size={17} fill="currentColor" />
        <p>
          <b>How it works</b> — Your streak grows when you solve a DSA problem
          or finish an aptitude test. Your local calendar sets the day.
        </p>
      </div>
    </div>
  );
}
function NotFound() {
  return (
    <div className="not-found">
      <Logo />
      <div className="not-found-number">404</div>
      <h1>Looks like this trail ends here.</h1>
      <p>
        The page you’re looking for may have moved. Let’s get you back on track.
      </p>
      <Link to="/" className="btn btn-primary">
        Back to CodeCrest <ArrowRight size={15} />
      </Link>
    </div>
  );
}
export default App;
