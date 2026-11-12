import React, { useState } from 'react'
import {
  FileText,
  Plus,
  Search,
  Pin,
  Tag,
  Edit2,
  Trash2,
  Copy,
  Check,
  Download,
  BookOpen
} from 'lucide-react'
import { useApp } from '../context/AppContext'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import Badge from '../components/common/Badge'
import NoteModal from '../components/notes/NoteModal'
import { formatDate } from '../utils/helpers'

export const Notes = () => {
  const { notes, subjects, togglePinNote, deleteNote } = useApp()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('ALL')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [noteToEdit, setNoteToEdit] = useState(null)
  const [copiedId, setCopiedId] = useState(null)
  const [activeNoteId, setActiveNoteId] = useState(notes[0]?.id || null)

  const filteredNotes = notes.filter((n) => {
    const matchesSearch =
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.tags?.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesSubject =
      selectedSubject === 'ALL' || n.subjectId === selectedSubject
    return matchesSearch && matchesSubject
  })

  // Sort: pinned first, then by date descending
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (a.pinned === b.pinned) {
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    }
    return a.pinned ? -1 : 1
  })

  const activeNote = notes.find((n) => n.id === activeNoteId) || sortedNotes[0]

  const handleCopy = (id, content) => {
    navigator.clipboard.writeText(content)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDownload = (note) => {
    const element = document.createElement('a')
    const file = new Blob([note.content], { type: 'text/markdown' })
    element.href = URL.createObjectURL(file)
    element.download = `${note.title.toLowerCase().replace(/\s+/g, '-')}.md`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Study Notes & Knowledge Base</h2>
          <p className="text-xs text-slate-500 mt-1">
            Capture lecture summaries, algorithm proofs, formulas, and revision flashcards.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => {
            setNoteToEdit(null)
            setIsModalOpen(true)
          }}
        >
          New Note
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search notes, formulas, or tags..."
            className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium">Filter Subject:</span>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none text-slate-700"
          >
            <option value="ALL">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes Layout: Master List (5 cols) + Reader Detail (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notes List Column */}
        <div className="lg:col-span-5 space-y-3">
          {sortedNotes.length === 0 ? (
            <Card className="py-12 text-center text-slate-400">
              <FileText className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold text-slate-700">No notes found</p>
              <p className="text-xs text-slate-400 mt-1">Create a note to start building your knowledge base</p>
            </Card>
          ) : (
            sortedNotes.map((note) => {
              const isSelected = activeNote?.id === note.id

              return (
                <div
                  key={note.id}
                  onClick={() => setActiveNoteId(note.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-2 ring-blue-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <Badge variant="indigo" size="xs">
                      {note.subjectCode}
                    </Badge>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        togglePinNote(note.id)
                      }}
                      className={`p-1 rounded-lg transition-colors ${
                        note.pinned
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-slate-300 hover:text-slate-600'
                      }`}
                      title={note.pinned ? 'Unpin' : 'Pin to top'}
                    >
                      <Pin className={`w-3.5 h-3.5 ${note.pinned ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 line-clamp-1">
                    {note.title}
                  </h4>

                  <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                    {note.content.replace(/#+\s+/g, '')}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                    <span>{formatDate(note.updatedAt)}</span>
                    <div className="flex items-center gap-1">
                      {note.tags?.slice(0, 2).map((t) => (
                        <span key={t} className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Reader Column */}
        <div className="lg:col-span-7">
          {activeNote ? (
            <Card padding="p-6" className="sticky top-20">
              {/* Header with actions */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="primary" size="xs">
                      {activeNote.subjectCode}
                    </Badge>
                    <span className="text-xs text-slate-400">
                      Last revised {formatDate(activeNote.updatedAt)}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 leading-snug">
                    {activeNote.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <button
                    onClick={() => handleCopy(activeNote.id, activeNote.content)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Copy note markdown"
                  >
                    {copiedId === activeNote.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => handleDownload(activeNote)}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Download as .md"
                  >
                    <Download className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      setNoteToEdit(activeNote)
                      setIsModalOpen(true)
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                    title="Edit note"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm('Delete this note?')) {
                        deleteNote(activeNote.id)
                      }
                    }}
                    className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete note"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tags */}
              {activeNote.tags && activeNote.tags.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap mb-4">
                  {activeNote.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Note Content display */}
              <div className="prose prose-slate max-w-none text-sm leading-relaxed whitespace-pre-line text-slate-700 font-sans">
                {activeNote.content}
              </div>
            </Card>
          ) : (
            <Card className="py-20 text-center text-slate-400">
              <BookOpen className="w-12 h-12 mx-auto mb-2 text-slate-300" />
              <p className="text-sm font-semibold">Select a note to read or edit</p>
            </Card>
          )}
        </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setNoteToEdit(null)
        }}
        noteToEdit={noteToEdit}
      />
    </div>
  )
}

export default Notes
