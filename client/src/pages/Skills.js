import React, {useEffect, useState} from 'react';
import SkillTable from '../components/skills/SkillTable';
import SkillForm from '../components/skills/SkillForm';

function Skills() {

    const [skills, setSkills] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetch('/api/skills/')
            .then((response) => response.json())
            .then((data) => {setSkills(data)})
            .catch((error) => console.error('Error fetching skills:', error));
    }, []);

    const updateSkill = (rowId, updatedData) => {
        const updatedSkills = skills.map((skill) => {
            if (skill._id === rowId) {
                return {...skill, ...updatedData};
            }
            return skill;
        });
        setSkills(updatedSkills);
    };

    const deleteSkill = (rowId) => {
        fetch(`/api/skills/${rowId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    setSkills(skills.filter((skill) => skill._id !== rowId));;
                } else {
                    console.error('Error deleting skill');
                }
            })
            .catch((error) => console.error('Error deleting skill:', error));
    }

    const addSkill = async (newSkillData) => {
        try {
            const response = await fetch('/api/skills/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSkillData),
            })
            if (response.ok) {
                const createdSkill = await response.json();
                setSkills([...skills, createdSkill]);
            } else {
                console.error('Error updating skill.');
            }
        } catch (error) {
            console.error('Error updating skill:', error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <SkillTable skills={skills} onUpdateSkill={updateSkill} onDeleteSkill={deleteSkill} />
            <button onClick={openModal}>Add Contact</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                    <SkillForm onAddSkill={addSkill} onCancel={closeModal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Skills;