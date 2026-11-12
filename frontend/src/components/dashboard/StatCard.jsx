import React from 'react'
import Card from '../common/Card'

export const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  trendPositive = true,
  color = 'blue'
}) => {
  const colorMap = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      glow: 'shadow-blue-500/10'
    },
    indigo: {
      bg: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      glow: 'shadow-indigo-500/10'
    },
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      glow: 'shadow-emerald-500/10'
    },
    amber: {
      bg: 'bg-amber-50',
      text: 'text-amber-600',
      border: 'border-amber-100',
      glow: 'shadow-amber-500/10'
    },
    violet: {
      bg: 'bg-violet-50',
      text: 'text-violet-600',
      border: 'border-violet-100',
      glow: 'shadow-violet-500/10'
    }
  }

  const selectedColor = colorMap[color] || colorMap.blue

  return (
    <Card hover className="relative overflow-hidden group">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-slate-900 mt-1.5 tracking-tight">
            {value}
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
              {trend && (
                <span
                  className={`font-semibold ${
                    trendPositive ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {trend}
                </span>
              )}
              <span>{subtitle}</span>
            </p>
          )}
        </div>

        {Icon && (
          <div
            className={`p-3 rounded-2xl ${selectedColor.bg} ${selectedColor.text} ${selectedColor.border} border transition-transform duration-300 group-hover:scale-110 shadow-sm ${selectedColor.glow}`}
          >
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Decorative subtle accent bar at bottom on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
    </Card>
  )
}

export default StatCard
