import React from "react";

function ActivityTimeline() {

  // const activities = [
  //   {
  //     action:"Added Netflix",
  //     time:"2 minutes ago"
  //   },
  //   {
  //     action:"Updated Spotify",
  //     time:"1 hour ago"
  //   },
  //   {
  //     action:"Deleted Prime Video",
  //     time:"Yesterday"
  //   },
  //   {
  //     action:"Exported PDF Report",
  //     time:"2 days ago"
  //   }
  // ];

  return (
    <div className="glass-card p-4">

      <h3 className="mb-4">
        Activity Timeline
      </h3>

      {activities.map((item,index)=>(
        <div
          key={index}
          className="timeline-item"
        >
          <div
            className="timeline-dot"
          />

          <div>
            <h6>{item.action}</h6>

            <small>
              {item.time}
            </small>
          </div>

        </div>
      ))}

    </div>
  );
}

export default ActivityTimeline;