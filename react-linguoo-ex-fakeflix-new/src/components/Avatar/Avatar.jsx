import React from "react";
import './Avatar.scss'
import Badge from "../Badge/Badge";

function Avatar({img, active, className, badge, children}) {
  console.log(children, 'icoooooon')
  return (
    <div className={className ?`${className} avatar` :"avatar"}>
      <div className="avatar-img">
        <div className="avatar-img__profile">
            {img ? <img src={img} className="avatar-img__profile-img" /> : null}
        </div>
        {active ? null: null}
      </div>
      {badge ? <Badge>{children}</Badge> : null}
     
    </div>
  );
}

export default Avatar