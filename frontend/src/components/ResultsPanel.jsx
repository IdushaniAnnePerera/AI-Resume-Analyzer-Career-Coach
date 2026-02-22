// src/components/ResultsPanel.jsx
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function ResultsPanel({ result }) {
  if (!result) return null;

  const score = Number(result.atsScore ?? 0);

  // ----- COLORS -----
  const SCORE_COLOR =
    score >= 85 ? "#16a34a" : score >= 70 ? "#2563eb" : score >= 55 ? "#f59e0b" : "#dc2626";
  const REMAIN_COLOR = "#e5e7eb";

  const MATCH_COLOR = "#16a34a";
  const MISS_COLOR = "#dc2626";

  // Donut chart data (ATS)
  const pieData = [
    { name: "Score", value: score },
    { name: "Remaining", value: Math.max(0, 100 - score) },
  ];

  // Skill match data
  const missingSet = new Set(result.missingSkills || []);
  const baseSkills = (result.requiredSkills || result.missingSkills || []).slice(0, 12);

  const skillsForChart = baseSkills.map((s) => ({
    skill: String(s),
    value: missingSet.has(s) ? 0 : 100,
    isMissing: missingSet.has(s),
  }));

  const chartHeight = Math.max(260, skillsForChart.length * 34);
  const short = (s) => (s.length > 22 ? s.slice(0, 22) + "…" : s);

  const matchedCount =
    (result.requiredSkills?.length ?? baseSkills.length) - (result.missingSkills?.length ?? 0);

  const scoreLabel =
    score >= 85 ? "Excellent" : score >= 70 ? "Good" : score >= 55 ? "Fair" : "Needs Work";

  return (
    <div className="resultsCard">
      <div className="resultsHeader">
        <div>
          <h2 className="resultsTitle">Analysis Result</h2>
          <p className="resultsSub">
            Keyword match, missing skills, and ATS-focused improvements.
          </p>
        </div>

        <div className={`badge ${score >= 80 ? "badgeGood" : score >= 60 ? "badgeMid" : "badgeBad"}`}>
          {scoreLabel}
        </div>
      </div>

      {/* ====== TOP STATS ====== */}
      <div className="gridStats">
        <div className="statBox">
          <div className="statLabel">ATS Score</div>
          <div className="statValue">{score}/100</div>
          <div className="statHint">Higher is better for keyword alignment</div>
        </div>

        <div className="statBox">
          <div className="statLabel">Missing Skills</div>
          <div className="statValue">{(result.missingSkills || []).length}</div>
          <div className="statHint">Add these to skills/bullets if true</div>
        </div>

        <div className="statBox">
          <div className="statLabel">Matched Skills</div>
          <div className="statValue">{Math.max(0, matchedCount)}</div>
          <div className="statHint">From job description keywords</div>
        </div>
      </div>

      {/* ====== CHARTS (STACKED) ====== */}
      <div style={{ marginTop: "1rem", display: "grid", gap: "0.8rem" }}>
        {/* ATS Donut */}
        <div className="chartCard">
          <h3 className="cardTitle">ATS Score</h3>
          <div className="chartWrap">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                >
                  <Cell fill={SCORE_COLOR} />
                  <Cell fill={REMAIN_COLOR} />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="centerText">
              <div className="centerScore">{score}</div>
              <div className="centerLabel">/ 100</div>
            </div>
          </div>

          <p className="cardHint">
            Aim for <strong>70+</strong> by mirroring job keywords naturally in your bullets.
          </p>
        </div>

        {/* Skill Match BELOW pie */}
        <div className="chartCard">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
            <h3 className="cardTitle" style={{ marginBottom: 0 }}>Skill Match</h3>

            {/* simple legend */}
            <div style={{ display: "flex", gap: "10px", fontSize: "0.9rem", fontWeight: 700, color: "#334155" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: MATCH_COLOR }} />
                Matched
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: MISS_COLOR }} />
                Missing
              </span>
            </div>
          </div>

          {skillsForChart.length === 0 ? (
            <p className="muted" style={{ marginTop: "0.75rem" }}>No skills found to chart.</p>
          ) : (
            <div style={{ marginTop: "0.75rem" }}>
              <ResponsiveContainer width="100%" height={chartHeight}>
                <BarChart
                  data={skillsForChart}
                  layout="vertical"
                  margin={{ left: 110, right: 20, top: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                  <YAxis
                    type="category"
                    dataKey="skill"
                    width={200}
                    interval={0}
                    tick={{ fontSize: 12 }}
                    tickFormatter={short}
                  />
                  <Tooltip
                    formatter={(v, _, ctx) => (ctx?.payload?.isMissing ? "Missing" : "Matched")}
                    labelFormatter={(label) => `Skill: ${label}`}
                  />

                  <Bar dataKey="value" radius={[10, 10, 10, 10]}>
                    {skillsForChart.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.isMissing ? MISS_COLOR : MATCH_COLOR}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          <p className="cardHint">Add missing skills only if you truly have them.</p>
        </div>
      </div>

      {/* ====== LISTS ====== */}
      <div className="gridLists">
        <section className="listCard">
          <div className="listHeader">
            <h3 className="cardTitle">Missing Skills</h3>
            <span className="miniPill">{(result.missingSkills || []).length}</span>
          </div>

          {(result.missingSkills || []).length === 0 ? (
            <p className="muted">
              Nice — no missing skills detected from the job description keywords.
            </p>
          ) : (
            <div className="pillWrap">
              {result.missingSkills.map((skill) => (
                <span className="pill pillRed" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </section>

        <section className="listCard">
          <div className="listHeader">
            <h3 className="cardTitle">Suggested Improvements</h3>
            <span className="miniPill">{(result.suggestions || []).length}</span>
          </div>

          <ul className="niceList">
            {(result.suggestions || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="listCard">
          <div className="listHeader">
            <h3 className="cardTitle">Improved Bullet Points</h3>
            <span className="miniPill">{(result.improvedBulletPoints || []).length}</span>
          </div>

          <ul className="niceList">
            {(result.improvedBulletPoints || []).map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}