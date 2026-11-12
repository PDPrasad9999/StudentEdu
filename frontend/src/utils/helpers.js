// Date & Time formatting helpers
export const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(date)
}

export const formatTime = (timeString) => {
  if (!timeString) return ''
  // If format is "14:30"
  if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':')
    const h = parseInt(hours, 10)
    const ampm = h >= 12 ? 'PM' : 'AM'
    const formattedHours = h % 12 || 12
    return `${formattedHours}:${minutes} ${ampm}`
  }
  return timeString
}

export const getDaysRemaining = (dueDateString) => {
  if (!dueDateString) return { text: 'No date', isUrgent: false, isOverdue: false, days: 999 }
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDateString)
  due.setHours(0, 0, 0, 0)
  
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return { text: `Overdue by ${Math.abs(diffDays)}d`, isUrgent: true, isOverdue: true, days: diffDays }
  } else if (diffDays === 0) {
    return { text: 'Due Today', isUrgent: true, isOverdue: false, days: 0 }
  } else if (diffDays === 1) {
    return { text: 'Due Tomorrow', isUrgent: true, isOverdue: false, days: 1 }
  } else {
    return { text: `${diffDays} days left`, isUrgent: diffDays <= 3, isOverdue: false, days: diffDays }
  }
}

export const formatDuration = (minutes) => {
  if (!minutes) return '0m'
  const hrs = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hrs > 0 && mins > 0) return `${hrs}h ${mins}m`
  if (hrs > 0) return `${hrs}h`
  return `${mins}m`
}

export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case 'high':
      return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' }
    case 'medium':
      return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' }
    case 'low':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' }
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' }
  }
}

export const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'submitted':
    case 'graded':
      return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' }
    case 'in progress':
      return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' }
    case 'to do':
    case 'planned':
      return { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200' }
    case 'overdue':
      return { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' }
    default:
      return { bg: 'bg-slate-50', text: 'text-slate-700', border: 'border-slate-200' }
  }
}
