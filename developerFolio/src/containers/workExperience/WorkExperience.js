import React, {useContext, useEffect, useRef, useState} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import {Fade, Slide, Zoom} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  const timelineRef = useRef(null);
  const [cursorTop, setCursorTop] = useState(0);

  useEffect(() => {
    function handleScroll() {
      if (!timelineRef.current) return;
      const timeline = timelineRef.current;
      const timelineRect = timeline.getBoundingClientRect();
      const scrollY = window.scrollY || window.pageYOffset;
      // Find all timeline rows
      const rows = Array.from(timeline.querySelectorAll('.timeline-row'));
      let found = false;
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const rect = row.getBoundingClientRect();
        const rowTop = rect.top + scrollY - timelineRect.top - 12; // 12px offset for center
        const rowBottom = rect.bottom + scrollY - timelineRect.top - 12;
        const viewportMiddle = scrollY + window.innerHeight / 2;
        if (viewportMiddle >= rowTop && viewportMiddle <= rowBottom) {
          setCursorTop(rowTop + (rect.height / 2));
          found = true;
          break;
        }
      }
      if (!found && rows.length > 0) {
        // If not found, stick to last
        const last = rows[rows.length - 1];
        const rect = last.getBoundingClientRect();
        setCursorTop(rect.top + scrollY - timelineRect.top + rect.height / 2 - 12);
      }
    }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!workExperiences.display) return null;

  return (
    <div id="experience" className="experience-timeline-container">
      <Fade bottom duration={1000} distance="20px">
        <h1 className="experience-heading">Experiences</h1>
        <div className="timeline" ref={timelineRef} style={{position: 'relative'}}>
          <div
            className="timeline-cursor"
            style={{top: `${cursorTop}px`, display: cursorTop ? 'block' : 'none'}}
          ></div>
          {workExperiences.experience.map((exp, i) => (
            <Slide left={i % 2 === 0} right={i % 2 !== 0} duration={900} distance="40px" key={i}>
              <div className="timeline-row">
                <Zoom duration={600} delay={100}>
                  <div className="timeline-date">
                    {exp.date}
                  </div>
                  <div className="timeline-dot"/>
                </Zoom>
                <Fade bottom duration={900} delay={150}>
                  <div className="timeline-card">
                    <div className="timeline-card-header">
                      <img src={exp.companylogo} alt={exp.company} className="timeline-logo"/>
                      <div>
                        <div className="timeline-role">{exp.role}</div>
                        <div className="timeline-company">@{exp.company}</div>
                      </div>
                    </div>
                    <ul className="timeline-desc">
                      {exp.descBullets && exp.descBullets.length > 0 ? (
                        exp.descBullets.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))
                      ) : (
                        <li>{exp.desc}</li>
                      )}
                    </ul>
                  </div>
                </Fade>
              </div>
            </Slide>
          ))}
        </div>
      </Fade>
    </div>
  );
}
