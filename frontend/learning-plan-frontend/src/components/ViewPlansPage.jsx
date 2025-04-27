import React, { useEffect, useState } from 'react';
import { getPlansByUser, updatePlan, deletePlan } from '../api/learningPlanApi';
import DeleteModal from './DeleteModal';
import { useNavigate } from 'react-router-dom';

function ViewPlansPage() {
  const [plans, setPlans] = useState([]);
  const [editingPlanId, setEditingPlanId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const response = await getPlansByUser(1);
    const plansWithTopics = response.data.map(plan => ({
      ...plan,
      topics: plan.topicsJson ? JSON.parse(plan.topicsJson) : []
    }));
    setPlans(plansWithTopics);
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEdit = (plan) => {
    setEditingPlanId(plan.id);
    setEditedTitle(plan.title);
  };

  const handleSave = async (plan) => {
    const updatedPlan = {
      ...plan,
      title: editedTitle,
      topicsJson: JSON.stringify(plan.topics)
    };
    await updatePlan(plan.id, updatedPlan);
    setEditingPlanId(null);
    fetchPlans();
  };

  const confirmDelete = (id) => {
    setShowDeleteModal(true);
    setPlanToDelete(id);
  };

  const handleDelete = async () => {
    await deletePlan(planToDelete);
    setShowDeleteModal(false);
    fetchPlans();
  };

  const handleStatusChange = (planId, topicIndex, newStatus) => {
    setPlans(prev =>
      prev.map(plan => 
        plan.id === planId 
          ? { ...plan, topics: plan.topics.map((topic, idx) => idx === topicIndex ? { ...topic, completed: newStatus === 'Completed' } : topic) }
          : plan
      )
    );
  };

  const handleTopicChange = (planId, topicIndex, field, value) => {
    // If the field is targetDate, validate that it's not in the past
    if (field === 'targetDate') {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day
      const selectedDate = new Date(value);
      
      // If selected date is before today, don't update
      if (selectedDate < today) {
        return;
      }
    }
  
    setPlans(prev =>
      prev.map(plan =>
        plan.id === planId
          ? {
              ...plan,
              topics: plan.topics.map((topic, idx) =>
                idx === topicIndex ? { ...topic, [field]: value } : topic
              )
            }
          : plan
      )
    );
  };
 

  const handleAddTopic = (planId) => {
    const newTopic = {
      id: Date.now(), // Temporary ID
      name: '',
      resourceUrl: '',
      targetDate: new Date().toISOString().split('T')[0],
      completed: false
    };
    setPlans(prev =>
      prev.map(plan =>
        plan.id === planId
          ? { ...plan, topics: [...plan.topics, newTopic] }
          : plan
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Your Learning Plans</h2>
        <button
          onClick={() => navigate('/create')}
          className="px-6 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-lg transition"
        >
          ➕ Create New Plan
        </button>
      </div>

      {/* Plans */}
      {plans.map((plan) => (
        <div key={plan.id} className="bg-white rounded-2xl shadow-md p-6 mb-8">
          {/* Plan Title */}
          {editingPlanId === plan.id ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mb-4"
            />
          ) : (
            <h3 className="text-2xl font-bold text-gray-700">{plan.title}</h3>
          )}

          {/* Topics Table */}
          {plan.topics?.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Left</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource URL</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {plan.topics
                    .sort((a, b) => new Date(a.targetDate) - new Date(b.targetDate))
                    .map((topic, idx) => {
                      const daysRemaining = getDaysRemaining(topic.targetDate);
                      return (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingPlanId === plan.id ? (
                              <input
                                type="text"
                                value={topic.name}
                                onChange={(e) => handleTopicChange(plan.id, idx, 'name', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              />
                            ) : (
                              topic.name
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingPlanId === plan.id ? (
                              <input
                                type="date"
                                value={topic.targetDate}
                                min={new Date().toISOString().split('T')[0]} // Set minimum date to today
                                onChange={(e) => handleTopicChange(plan.id, idx, 'targetDate', e.target.value)}
                                className="p-2 border border-gray-300 rounded-lg"
                              />
                            ) : (
                              new Date(topic.targetDate).toLocaleDateString()
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`text-sm ${
                              daysRemaining < 0 ? 'text-red-600' :
                              daysRemaining <= 7 ? 'text-yellow-600' :
                              'text-green-600'
                            }`}>
                              {daysRemaining < 0
                                ? `${Math.abs(daysRemaining)} overdue`
                                : `${daysRemaining} left`}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {editingPlanId === plan.id ? (
                              <input
                                type="text"
                                value={topic.resourceUrl}
                                onChange={(e) => handleTopicChange(plan.id, idx, 'resourceUrl', e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                placeholder="Resource URL"
                              />
                            ) : (
                              topic.resourceUrl ? (
                                <a
                                  href={topic.resourceUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-blue-600 hover:text-blue-900"
                                >
                                  📄 View Resource
                                </a>
                              ) : '-'
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <select
                              value={topic.completed ? 'Completed' : 'Pending'}
                              onChange={(e) => handleStatusChange(plan.id, idx, e.target.value)}
                              className="p-2 border border-gray-300 rounded-lg"
                              disabled={editingPlanId !== plan.id}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          )}

          {/* Add Topic Button */}
          {editingPlanId === plan.id && (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => handleAddTopic(plan.id)}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
              >
                ➕ Add Topic
              </button>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            {editingPlanId === plan.id ? (
              <>
                <button
                  onClick={() => handleSave(plan)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  💾 Save Changes
                </button>
                <button
                  onClick={() => setEditingPlanId(null)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-semibold transition"
                >
                  ❌ Cancel
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(plan)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => confirmDelete(plan.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                >
                  🗑️ Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Delete Modal */}
      {showDeleteModal && (
        <DeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}

export default ViewPlansPage;
