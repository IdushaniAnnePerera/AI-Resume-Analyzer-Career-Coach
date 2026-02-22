export default function ResultsPanel({ result }) {
  if (!result) return null

  return (
    <div className="results">
      <h2>Analysis Result</h2>
      <p><strong>ATS Score:</strong> {result.atsScore}/100</p>

      <section>
        <h3>Missing Skills</h3>
        <ul>{result.missingSkills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      </section>

      <section>
        <h3>Suggested Improvements</h3>
        <ul>{result.suggestions.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
      </section>

      <section>
        <h3>Improved Bullet Points</h3>
        <ul>{result.improvedBulletPoints.map((item, idx) => <li key={idx}>{item}</li>)}</ul>
      </section>

      <section>
        <h3>LinkedIn Title Suggestion</h3>
        <p>{result.linkedinTitle}</p>
      </section>
    </div>
  )
}
