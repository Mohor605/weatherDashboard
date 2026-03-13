import React from 'react';
import { MapPin } from 'lucide-react';

const UserProfile = ({ name, location }) => {
  return (
    <div className="user-profile">
      <div className="user-avatar">👤</div>
      <div className="user-info">
        <div className="user-name">{name}</div>
        <div className="user-location">
          <MapPin size={14} /> {location}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;