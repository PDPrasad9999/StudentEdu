import React from 'react'
import {
  BarChart3,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Calendar,
  Flame,
  Zap,
  Target
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card, { CardHeader } from '../components/common/Card'
import StatCard from '../components/dashboard/StatCard'

export const ProgressAnalytics = () => {
  const { analytics, user, subjects, assignments } = useApp()

  const completedAssignmentsCount = assignments.filter(
    (a) => a.status === 'Submitted' || a.status === 'Graded'
  ).length
  const totalAssignmentsCount = assignments.length
  const realCompletionRate =
    totalAssignmentsCount > 0
      ? Math.round((completedAssignmentsCount / totalAssignmentsCount) * 100)
      : 88

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Academic Analytics & Insights</h2>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven visual insights on study consistency, subject distribution, and milestone achievements.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
          <Zap className="w-4 h-4 text-emerald-600 fill-emerald-500" />
          <span>Productivity Score: {analytics.productivityScore}%</span>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Focus Time"
          value={`${user.totalFocusHours}h`}
          subtitle="logged this semester"
          icon={Clock}
          color="blue"
        />

        <StatCard
          title="Deliverables Done"
          value={`${completedAssignmentsCount}/${totalAssignmentsCount}`}
          subtitle={`${realCompletionRate}% completion rate`}
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="Active Streak"
          value={`${user.currentStreak} Days`}
          subtitle="consistency record"
          icon={Flame}
          color="amber"
        />

        <StatCard
          title="Average Focus Block"
          value={`${analytics.avgFocusPerSessionMinutes}m`}
          subtitle="per study session"
          icon={Target}
          color="indigo"
        />
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Focus Bar Chart (7 cols) */}
        <div className="lg:col-span-7">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader
                title="Weekly Focus Hours"
                subtitle="Daily focus time logged vs 3.0h target line"
                icon={BarChart3}
              />

              <div className="pt-6 pb-2">
                {/* SVG / Flex Bar Chart */}
                <div className="flex items-end justify-between gap-3 h-52 px-2 border-b border-slate-200">
                  {analytics.dailyFocusHours.map((item) => {
                    const maxBarHeight = 6.5 // max scale 6.5 hours
                    const heightPercent = Math.min(100, Math.round((item.hours / maxBarHeight) * 100))
                    const targetPercent = Math.round((item.target / maxBarHeight) * 100)

                    return (
                      <div
                        key={item.day}
                        className="flex-1 flex flex-col items-center gap-2 group relative"
                      >
                        {/* Tooltip */}
                        <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded pointer-events-none z-10 whitespace-nowrap">
                          {item.hours} hrs ({Math.round((item.hours / item.target) * 100)}% of goal)
                        </div>

                        {/* Bar */}
                        <div className="w-full max-w-[36px] bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden relative">
                          {/* Target indicator line */}
                          <div
                            className="absolute left-0 right-0 border-b border-dashed border-amber-400 z-10"
                            style={{ bottom: `${targetPercent}%` }}
                            title="Daily Target: 3.0h"
                          />
                          <div
                            className={`w-full rounded-t-xl transition-all duration-500 ${
                              item.hours >= item.target
                                ? 'bg-gradient-to-t from-blue-600 to-blue-500'
                                : 'bg-gradient-to-t from-slate-400 to-slate-300'
                            }`}
                            style={{ height: `${heightPercent}%` }}
                          />
                        </div>

                        {/* Day label */}
                        <span className="text-xs font-semibold text-slate-500">
                          {item.day}
                        </span>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-blue-600 inline-block" />
                    <span>Focus Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 border-b border-dashed border-amber-400 inline-block" />
                    <span>Daily Target (3.0h)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
              <span>Weekly Total: <strong>29.8 hrs</strong></span>
              <span className="text-emerald-600 font-semibold">+18% vs last week</span>
            </div>
          </Card>
        </div>

        {/* Subject-Wise Time Distribution (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="h-full flex flex-col justify-between">
            <div>
              <CardHeader
                title="Subject Time Distribution"
                subtitle="Focus time allocation across enrolled courses"
                icon={Target}
              />

              <div className="space-y-4 pt-2">
                {analytics.subjectDistribution.map((item) => (
                  <div key={item.subject}>
                    <div className="flex items-center justify-between text-xs font-semibold mb-1">
                      <span className="text-slate-800">{item.subject}</span>
                      <span className="text-slate-500">{item.hours}h ({item.percentage}%)</span>
                    </div>

                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${item.percentage}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-6 text-xs text-slate-500">
              💡 <strong>Smart Balance:</strong> Great balance! Consider allocating 1 extra hour to <em>Modern Quantum Physics</em> to prepare for the upcoming lab test.
            </div>
          </Card>
        </div>
      </div>

      {/* Productivity Insights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card>
          <div className="flex items-center gap-2 mb-2 text-blue-700">
            <Clock className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">
              Peak Focus Window
            </h4>
          </div>
          <p className="text-lg font-extrabold text-slate-900">09:00 AM – 11:30 AM</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Your highest focus scores (avg 94%) occur in morning deep work sessions.
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2 text-indigo-700">
            <Award className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">
              Efficiency Milestone
            </h4>
          </div>
          <p className="text-lg font-extrabold text-slate-900">Level 8 Scholar</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Completed 64 consecutive focus cycles. 8 more to unlock Level 9 Master.
          </p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2 text-emerald-700">
            <CheckCircle2 className="w-4 h-4" />
            <h4 className="font-bold text-xs uppercase tracking-wider">
              On-Time Submission Rate
            </h4>
          </div>
          <p className="text-lg font-extrabold text-slate-900">96.5%</p>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Only 1 overdue assignment this semester. High discipline record!
          </p>
        </Card>
      </div>
    </div>
  )
}

export default ProgressAnalytics
