import { CopyToClipboard } from "react-copy-to-clipboard";
import { useContext, useMemo } from "react";
import { FaCopy } from "react-icons/fa6";
import { motion } from "framer-motion";
import { SnackbarContext, SnackbarProvider } from "./Snackbar";
import constants from "./details";

function SectionHeader({ title }: any) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 1 }}
    >
      <motion.h2 
        variants={constants.variant(-10)} 
        className="text-lg text-golden font-extrabold"
      >
        {title}
      </motion.h2>
      <hr className="mb-2"/>
    </motion.div>
  );
}

function SkillIcon({ skill }: any) {
  if (skill.link) return (
    <li>
      <a href={skill.link}>
        <img 
          src={`/skills/${skill.name}.svg`} 
          alt={skill.name} 
          className="w-full h-full bg-white p-1 object-contain rounded"
        />
      </a>
    </li>
  );

  return (
    <li>
      <img 
        src={`/skills/${skill.name}.svg`} 
        alt={skill.name} 
        className="w-full h-full bg-white p-1 object-contain rounded"
      />
    </li>
  );
}

function Resume() {
  const summary = useMemo(constants.summary, []);
  const snackbar = useContext(SnackbarContext);

  return (
    <div className="bg-gray-900 flex flex-col pt-8">
      <section className="flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-2">Hi, I'm {constants.header.name}</h1>
        <h2 className="text-base text-lg mb-2 flex flex-row gap-1">
          {constants.header.email}
          <CopyToClipboard text={constants.header.email}>
            <button className="flex items-center text-xs hover:text-blue-200" onClick={() => snackbar?.open("Email Copied!")}>
              <FaCopy/>
            </button>
          </CopyToClipboard>
        </h2>
        <a className="text-base underline hover:text-blue-200" href={constants.header.github}>
          {constants.header.github.substring(8)}
        </a>
      </section>

      <div className="flex items-center justify-center py-8 px-4">
        <div className="w-full rounded-lg bg-gray-800 p-8">
          <section className="mb-8">
            <SectionHeader title="Summary"/>
            <p className="text-base">{summary}</p>
          </section>

          <section className="mb-8">
            <SectionHeader title="Technical Skills"/>
            <motion.div 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 1 }}
              className="w-full flex flex-wrap flex-row items-center justify-start -mb-1"
            >
              {constants.skills.list.map((skill: any, i) => (
                <motion.ul
                  key={skill.name}
                  variants={constants.variant(0, 25, i*0.10)} 
                  className="w-2/12 aspect-square p-1 flex justify-center items-center"
                >
                  <SkillIcon skill={skill}/>
                </motion.ul>
              ))}
            </motion.div>
          </section>

          <section className="mb-8">
            <SectionHeader title="Work Experience"/>
            <ul className="flex flex-col gap-4">
              {constants.experiences.map((experience) => (
                <li key={experience.timeline}>
                  <h3 className="flex justify-between items-center">
                    <span className="text-base font-bold">{experience.position}</span>
                    <span className="text-xs">{experience.timeline}</span>
                  </h3>
                  <h3 className="flex justify-between text-sm mb-2">{experience.company}</h3>
                  <ul className="list-disc px-4 text-sm">
                    {experience.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <SectionHeader title="Personal Projects"/>
            <ul className="flex flex-col gap-2 mb-2">
              {constants.projects.map((project) => (
                <li key={project.title}>
                  <h3 className="text-base font-bold">{project.title}</h3>
                  <p className="text-base mb-1">{project.description}</p>
                  <div className="flex justify-end gap-2 text-sm">
                    <a className="underline hover:text-blue-200" href={project.github}>Repo</a>
                    <a className="underline hover:text-blue-200" href={project.demo}>Code</a>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <SectionHeader title="Education"/>
            <h3 className="flex justify-between items-center">
              <span className="text-base font-bold">{constants.education.institution}</span>
              <span className="text-xs">{constants.education.dateGraduated}</span>
            </h3>
            <h3 className="flex justify-between text-sm mb-2 whitespace-pre-line">{constants.education.degree}</h3>
            <h3 className="text-sm">Relevant Courses:</h3>
            <ul className="list-disc px-4 text-sm">
              {constants.education.courses.map((course) => (
                <li key={course}>{course}</li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}

export default () => (
  <SnackbarProvider>
    <Resume/>
  </SnackbarProvider>
);
