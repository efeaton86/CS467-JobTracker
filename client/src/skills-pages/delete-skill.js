import React, { useState } from 'react';

function DeleteSkill() {
    const [skillId, setSkillId] = useState('');

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/delete_skill/${skillId}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                console.log('Skill deleted successfully');
            } else {
                console.error('Error deleting skill');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={skillId}
                onChange={(e) => setSkillId(e.target.value)}
                placeholder="Enter skill ID"
            />
            <button onClick={handleDelete}>Delete Skill</button>
        </div>
    );
}

export default DeleteSkill;
