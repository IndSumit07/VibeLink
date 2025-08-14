import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const dashboardBg = '#F4F3EF';
const accentColor = '#B89F73';

const services = [
  { title: 'Laptop Repair', category: 'Repair', price: '₹200/hr', status: 'Available', bookings: 12, ratings: 4.7, feedback: 32 },
  { title: 'Math Tuition', category: 'Tuition', price: '₹500/month', status: 'Booked', bookings: 7, ratings: 4.9, feedback: 12 },
];

const notes = [
  { subject: 'DSA', semester: '4th', filename: 'DSA_notes.pdf', likes: 20, saves: 15 },
  { subject: 'AI', semester: '5th', filename: 'AI_cheatsheet.docx', likes: 30, saves: 22 },
];

const leaderboard = [
  { name: 'Priya', avatar: 'https://i.pravatar.cc/40?u=a', notes: 20 },
  { name: 'Rahul', avatar: 'https://i.pravatar.cc/40?u=b', notes: 17 },
];

const events = [
  { title: 'Hackathon', rsvp: 'Going', match: 85, date: 'Aug 20, 2025' },
  { title: 'College Fest', rsvp: 'Interested', match: 72, date: 'Sep 3, 2025' },
];

const buddies = [
  { name: 'Sam', avatar: 'https://i.pravatar.cc/32?u=x', interests: 'Coding' },
  { name: 'Nisha', avatar: 'https://i.pravatar.cc/32?u=y', interests: 'Events' },
];

export default function Dashboard() {
  const { userData, setUserData, backendUrl } = useContext(AppContent);

  const user = {
    avatar: userData.profileImage,
    name: userData.fullname,
    bio: userData.bio,
    location: userData.collegeName,
    followers: userData.followers,
    following: userData.following,
    listedServices: 6,
    bookedServices: 3,
    uploadedNotes: 14,
    eventsJoined: 5,
    eventsCreated: 2,
    title: userData.title,
  };

  // Modal + form state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullname: userData.fullname,
    bio: userData.bio,
    title: userData.title,
    location: userData.collegeName
  });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormData({
      ...userData, 
      fullname: formData.fullname,
      bio: formData.bio,
      title: formData.title,
      location: formData.location
    });

    const data = await axios.post(backendUrl + "/api/user/update-profile", {fullname: formData.fullname, bio: formData.bio, title: formData.title, collegeName: formData.location  })

    if(data.success){
      toast.success(data.message)
    }else{
      toast.error(data.message)
    }
    setIsEditing(false);
  };

  return (
    <div style={{
      background: `linear-gradient(135deg, ${dashboardBg} 80%, #fefefe 100%)`,
      minHeight: '100vh', color: '#493924', fontFamily: 'system-ui', padding: '36px 44px'
    }}>

      {/* Profile Widget */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          display: 'flex', background: dashboardBg, padding: 32, borderRadius: 18,
          boxShadow: '0 6px 18px rgba(184,159,115,0.08)', alignItems: 'center', marginBottom: 28
        }}
      >
        <div className='w-32 h-32 p-5 bg-[#493924] rounded-full flex justify-center items-center mr-5'>
          <div className='text-white text-5xl'>
            {
              user.avatar
            }
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 28 }}>{user.name}</h1>
          <div style={{ color: accentColor, marginBottom: 6 }}>{user.title}</div>
          <div style={{ marginBottom: 8 }}>📍 {user.location}</div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <span>👥 <b>{user.followers}</b></span>
            <span>👤 <b>{user.following}</b></span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: accentColor, color: '#fff', border: 'none',
                padding: '6px 18px', borderRadius: 14, cursor: 'pointer', fontWeight: 500
              }}
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </motion.button>
          </div>
        </div>
        <div>
          <div><b>{user.listedServices}</b> Listed</div>
          <div><b>{user.bookedServices}</b> Booked</div>
          <div><b>{user.uploadedNotes}</b> Notes</div>
          <div><b>{user.eventsCreated + user.eventsJoined}</b> Events</div>
        </div>
      </motion.section>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          background: '#fff', borderRadius: 14, padding: 20,
          boxShadow: '0 4px 13px rgba(184,159,115,0.06)', marginBottom: 28
        }}
      >
        <h2 style={{ color: accentColor }}>About Me</h2>
        <p style={{ lineHeight: 1.6 }}>{user.bio}</p>
      </motion.section>

      {/* Service Marketplace */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
        style={{
          background: '#fff', borderRadius: 14, marginBottom: 28, padding: 30,
          boxShadow: '0 4px 13px rgba(184,159,115,0.06)'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <h2 style={{ color: accentColor }}>Service Marketplace</h2>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            style={{
              background: accentColor, color: '#fff', border: 'none',
              padding: '9px 24px', borderRadius: 11, cursor: 'pointer', fontWeight: 500
            }}>+ List New Service</motion.button>
        </div>
        <div style={{ display: 'flex', gap: 22, marginTop: 22, flexWrap: 'wrap' }}>
          {services.map((svc, i) => (
            <motion.div
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(184,159,115,0.2)' }}
              style={{
                background: dashboardBg, borderRadius: 10, padding: 18,
                minWidth: 260, boxShadow: '0 1px 6px #ddd'
              }}>
              <h3>{svc.title}</h3>
              <div style={{ color: accentColor }}>{svc.category} | {svc.price}</div>
              <div>Status: <b>{svc.status}</b></div>
              <div>📃 {svc.bookings} bookings | ⭐ {svc.ratings} ({svc.feedback} reviews)</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Notes Sharing */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        style={{
          background: '#fff', borderRadius: 14, marginBottom: 28, padding: 30,
          boxShadow: '0 4px 13px rgba(184,159,115,0.06)'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
          <h2 style={{ color: accentColor }}>Notes Sharing</h2>
          <div>
            <motion.button whileHover={{ scale: 1.05 }} style={{
              background: accentColor, color: '#fff', padding: '7px 15px', borderRadius: 11, marginRight: 13
            }}>Upload Notes</motion.button>
            <motion.button whileHover={{ scale: 1.05 }} style={{
              background: '#fff', color: accentColor, border: `2px solid ${accentColor}`,
              padding: '7px 15px', borderRadius: 11
            }}>Search Notes</motion.button>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: dashboardBg }}>
              <th>Subject</th><th>Semester</th><th>File</th><th>👍</th><th>🔖</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, i) => (
              <motion.tr key={i} whileHover={{ backgroundColor: '#f9f6f0' }}
                style={{ borderBottom: '1px solid #efe5d6' }}>
                <td>{note.subject}</td>
                <td>{note.semester}</td>
                <td>{note.filename}</td>
                <td>{note.likes}</td>
                <td>{note.saves}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: 10 }}>
          <h4 style={{ color: accentColor }}>Leaderboard</h4>
          <div style={{ display: 'flex', gap: 16 }}>
            {leaderboard.map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}
                style={{
                  display: 'flex', alignItems: 'center', background: dashboardBg, padding: 8,
                  borderRadius: 8, boxShadow: '0 1px 4px #e2d6b6'
                }}>
                <img src={p.avatar} alt="leader" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 7 }} />
                <div><b>{p.name}</b> <div style={{ fontSize: 13 }}>Notes: {p.notes}</div></div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Events & Buddy Finder */}
      <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        style={{
          background: '#fff', borderRadius: 14, padding: 30,
          boxShadow: '0 4px 13px rgba(184,159,115,0.06)'
        }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ color: accentColor }}>Events & Buddy Finder</h2>
          <motion.button whileHover={{ scale: 1.05 }} style={{
            background: accentColor, color: '#fff', padding: '9px 24px', borderRadius: 11
          }}>+ Create Event</motion.button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22, margin: '20px 0' }}>
          {events.map((ev, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}
              style={{
                background: dashboardBg, borderRadius: 10, padding: 18,
                minWidth: 220, boxShadow: '0 1px 6px #ddd'
              }}>
              <h3>{ev.title}</h3>
              <div>{ev.date}</div>
              <div>RSVP: <b>{ev.rsvp}</b></div>
              <div>❤️ Match: {ev.match}%</div>
            </motion.div>
          ))}
          <div style={{ minWidth: 180 }}>
            <h3 style={{ color: accentColor }}>Buddy Matches</h3>
            {buddies.map((b, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}
                style={{
                  display: 'flex', alignItems: 'center', background: dashboardBg, marginTop: 7,
                  padding: 7, borderRadius: 7
                }}>
                <img src={b.avatar} alt="match" style={{ width: 24, height: 24, borderRadius: '50%', marginRight: 8 }} />
                <span>{b.name} <span style={{ fontSize: 13, color: accentColor }}>({b.interests})</span></span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer style={{
        borderTop: `2px solid #e5d6b6`, marginTop: 44, paddingTop: 16, color: '#83673a',
        display: 'flex', justifyContent: 'space-between', fontSize: 15
      }}>
        <div>Help | Terms | Contact</div>
        <div>Get Our App: Android | iOS</div>
      </footer>

      {/* Edit Profile Modal */}
      {isEditing && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.4)', display: 'flex',
            justifyContent: 'center', alignItems: 'center', zIndex: 1000
          }}
        >
          <div style={{
            background: '#fff', padding: '20px 30px', borderRadius: 12,
            width: '400px', boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ marginBottom: 12 }}>Edit Profile</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 10 }}>
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 6 }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 6 }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Location:</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  style={{ width: '100%', padding: 6 }}
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <label>Bio:</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  style={{ width: '100%', padding: 6 }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
                <button type="button" onClick={() => setIsEditing(false)} style={{
                  padding: '6px 14px', borderRadius: 8, border: '1px solid #ccc'
                }}>Cancel</button>
                <button type="submit" style={{
                  padding: '6px 14px', borderRadius: 8, background: accentColor, color: '#fff', border: 'none'
                }}>Save</button>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
