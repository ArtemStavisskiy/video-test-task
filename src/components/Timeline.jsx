import './Timeline.css';

export default function Timeline({ currentTime, duration, onTimelineClick }) {
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const time = ((e.clientX - rect.left) / rect.width) * duration;
    onTimelineClick(time);
  };

  return (
    <div className="timeline" onClick={handleClick}>
      <div className="timeline-progress" style={{ width: `${(currentTime / duration) * 100}%` }} />
      <div className="timeline-marker" style={{ left: `${(currentTime / duration) * 100}%` }} />
    </div>
  );
} 