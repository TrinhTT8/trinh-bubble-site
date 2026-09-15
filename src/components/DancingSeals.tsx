const seals = ["🦭", "🦭", "🦭", "🦭", "🦭"];
const sealDelays = [0, 0.15, 0.3, 0.15, 0];
const notes = ["♪", "♫", "♪"];

/**
 * A little bit of whimsy dropped into the contact form — a row of dancing
 * seals to keep things fun while your message is on its way.
 */
const DancingSeals = () => (
  <div className="relative overflow-hidden">
    <div className="relative flex items-end justify-center gap-3 sm:gap-4 h-20">
      {notes.map((note, i) => (
        <span
          key={i}
          className="absolute text-accent/50 text-lg animate-float-note"
          style={{ left: `${22 + i * 26}%`, animationDelay: `${i * 0.7}s` }}
        >
          {note}
        </span>
      ))}
      {seals.map((seal, i) => (
        <span
          key={i}
          className="inline-block text-4xl sm:text-5xl animate-seal-dance origin-bottom"
          style={{ animationDelay: `${sealDelays[i]}s` }}
        >
          {seal}
        </span>
      ))}
    </div>
  </div>
);

export default DancingSeals;
