import React, { useState } from 'react'
import {
  User,
  GraduationCap,
  Mail,
  School,
  Award,
  BookOpen,
  Calendar,
  Save,
  Download,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card, { CardHeader } from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'

export const StudentProfile = () => {
  const { user, updateUser, subjects, assignments, notes, studySessions } = useApp()

  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    studentId: user.studentId || '',
    university: user.university || '',
    major: user.major || '',
    semester: user.semester || '',
    gpa: user.gpa || 3.84,
    targetGpa: user.targetGpa || 3.95,
    dailyGoalMinutes: user.dailyGoalMinutes || 180,
    bio: user.bio || '',
    avatar: user.avatar || '',
  })

  const [savedSuccess, setSavedSuccess] = useState(false)

  const handleSave = (e) => {
    e.preventDefault()
    updateUser({
      ...formData,
      gpa: parseFloat(formData.gpa) || 3.8,
      targetGpa: parseFloat(formData.targetGpa) || 3.9,
      dailyGoalMinutes: parseInt(formData.dailyGoalMinutes, 10) || 180,
    })
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 3000)
  }

  // Export all application data as JSON
  const handleExportData = () => {
    const fullBackup = {
      exportedAt: new Date().toISOString(),
      user,
      subjects,
      assignments,
      notes,
      studySessions
    }
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `smartedu_backup_${new Date().toISOString().split('T')[0]}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  return (
    <div className="space-y-6">
      {/* Student Banner Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
        {/* Cover graphic */}
        <div className="h-32 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative">
          <div className="absolute top-4 right-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold text-white border border-white/20 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              Verified Student Account
            </span>
          </div>
        </div>

        {/* Profile Info Row */}
        <div className="px-6 pb-6 pt-0 relative flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-12">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4">
            <img
              src={formData.avatar || user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md bg-white"
            />
            <div className="space-y-1">
              <h2 className="text-2xl font-extrabold text-slate-900 leading-tight">
                {user.name}
              </h2>
              <p className="text-xs font-semibold text-blue-600 flex items-center gap-1.5">
                <School className="w-3.5 h-3.5" />
                {user.university} • {user.major}
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                Student ID: {user.studentId} • {user.semester}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              icon={Download}
              onClick={handleExportData}
            >
              Export JSON
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid: Form (8 cols) + Academic Goal Cards (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form Column (8 cols) */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader
              title="Edit Student Information"
              subtitle="Update your academic credentials, email preferences, and personal bio"
              icon={User}
            />

            {savedSuccess && (
              <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-600" />
                Profile details successfully updated!
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    University / College
                  </label>
                  <input
                    type="text"
                    value={formData.university}
                    onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Major / Department
                  </label>
                  <input
                    type="text"
                    value={formData.major}
                    onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Semester / Term
                  </label>
                  <input
                    type="text"
                    value={formData.semester}
                    onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Current GPA (4.0 Scale)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={formData.gpa}
                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Target GPA Goal
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="4.0"
                    value={formData.targetGpa}
                    onChange={(e) => setFormData({ ...formData, targetGpa: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Daily Focus Goal (Mins)
                  </label>
                  <input
                    type="number"
                    step="15"
                    min="30"
                    max="600"
                    value={formData.dailyGoalMinutes}
                    onChange={(e) => setFormData({ ...formData, dailyGoalMinutes: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Avatar Image URL
                </label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 font-mono text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bio & Academic Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <Button type="submit" variant="primary" size="md" icon={Save}>
                  Save Profile Changes
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Academic Standings Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <Card>
            <CardHeader
              title="Graduation Progress"
              subtitle="Bachelor Degree Requirement"
              icon={GraduationCap}
            />

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>Earned Credits</span>
                  <span className="font-bold text-slate-900">
                    {user.totalCredits} / {user.targetCredits} Credits
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full"
                    style={{ width: `${Math.round((user.totalCredits / user.targetCredits) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  {user.targetCredits - user.totalCredits} credits remaining until completion
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
                  <span>GPA Target Milestone</span>
                  <span className="font-bold text-slate-900">
                    {user.gpa.toFixed(2)} / {user.targetGpa.toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${Math.round((user.gpa / user.targetGpa) * 100)}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Dean’s List Distinction Active
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
            <div className="flex items-center gap-2 mb-2 text-blue-800">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h4 className="font-bold text-xs uppercase tracking-wider">
                SmartEdu Cloud Sync
              </h4>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">
              When MongoDB Atlas backend is enabled, your study sessions, assignments, and notes automatically sync across all your devices in real-time.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
