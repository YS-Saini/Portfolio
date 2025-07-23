import React, {useContext} from "react";
import "./WorkExperience.scss";
import {workExperiences} from "../../portfolio";
import {Fade} from "react-reveal";
import StyleContext from "../../contexts/StyleContext";

export default function WorkExperience() {
  const {isDark} = useContext(StyleContext);
  if (!workExperiences.display) return null;

  return (
    <div id="experience">
      <Fade bottom duration={1000} distance="20px">
        <div className="experience-timeline-container">
          <h1 className="experience-heading">Experiences</h1>
          <div className="timeline">
            {workExperiences.experience.map((exp, i) => (
              <div className="timeline-row" key={i}>
                <div className="timeline-date">
                  {exp.date}
                </div>
                <div className="timeline-dot"/>
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <img src={exp.companylogo} alt={exp.company} className="timeline-logo"/>
                    <div>
                      <div className="timeline-role">{exp.role}</div>
                      <div className="timeline-company">@{exp.company}</div>
                    </div>
                  </div>
                  <ul className="timeline-desc">
                    {exp.descBullets && exp.descBullets.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Fade>
    </div>
  );
}
