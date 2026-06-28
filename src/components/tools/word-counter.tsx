'use client'

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import {
  Type,
  Copy,
  Trash2,
  Clock,
  MessageSquare,
  AlignLeft,
  Hash,
  BookOpen,
} from 'lucide-react'

export default function WordCounter() {
  const { toast } = useToast()
  const [text, setText] = useState('')

  const stats = useMemo(() => {
    if (!text.trim()) {
      return {
        words: 0,
        characters: 0,
        charactersNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTime: 0,
        speakingTime: 0,
      }
    }

    const words = text.trim().split(/\s+/).filter(Boolean).length
    const characters = text.length
    const charactersNoSpaces = text.replace(/\s/g, '').length
    const sentences = text
      .split(/[.!?]+/)
      .map((s) => s.trim())
      .filter(Boolean).length
    const paragraphs =
      text
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean).length || (text.trim() ? 1 : 0)
    const readingTime = Math.max(1, Math.ceil(words / 200))
    const speakingTime = Math.max(1, Math.ceil(words / 130))

    return {
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
      speakingTime,
    }
  }, [text])

  const handleClear = useCallback(() => {
    setText('')
    toast({
      title: 'Text cleared',
      description: 'The text area has been emptied.',
    })
  }, [toast])

  const handleCopy = useCallback(async () => {
    if (!text.trim()) {
      toast({
        title: 'Nothing to copy',
        description: 'The text area is empty.',
        variant: 'destructive',
      })
      return
    }
    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: 'Copied to clipboard',
        description: 'Your text has been copied successfully.',
      })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy text. Please try manually.',
        variant: 'destructive',
      })
    }
  }, [text, toast])

  return (
    <div className="space-y-6">
      <Card className="border-emerald-200 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-emerald-700">
            <Type className="h-5 w-5" />
            Word &amp; Character Counter
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Start typing or paste your text here..."
            className="min-h-[200px] resize-y border-emerald-200 bg-white font-sans text-base leading-relaxed placeholder:text-emerald-400/70 focus-visible:ring-emerald-400"
          />

          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Copy className="mr-1.5 h-4 w-4" />
              Copy Text
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Trash2 className="mr-1.5 h-4 w-4" />
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <Hash className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Words
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.words.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <Type className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Characters
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.characters.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <Type className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              No Spaces
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.charactersNoSpaces.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <MessageSquare className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Sentences
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.sentences.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <AlignLeft className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Paragraphs
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.paragraphs.toLocaleString()}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Reading Time
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.words === 0 ? '0' : `${stats.readingTime}`}
            </span>
            <span className="text-[10px] text-emerald-500">
              {stats.words === 0
                ? ''
                : stats.readingTime === 1
                  ? 'min'
                  : 'mins'}
            </span>
          </CardContent>
        </Card>

        <Card className="border-emerald-200 bg-emerald-50/50 shadow-sm">
          <CardContent className="flex flex-col items-center gap-1 p-4 text-center">
            <Clock className="h-5 w-5 text-emerald-500" />
            <span className="text-xs font-medium uppercase tracking-wider text-emerald-600/70">
              Speaking Time
            </span>
            <span className="text-2xl font-bold tabular-nums text-emerald-700">
              {stats.words === 0 ? '0' : `${stats.speakingTime}`}
            </span>
            <span className="text-[10px] text-emerald-500">
              {stats.words === 0
                ? ''
                : stats.speakingTime === 1
                  ? 'min'
                  : 'mins'}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Summary Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <Hash className="mr-1 h-3.5 w-3.5" />
          {stats.words} {stats.words === 1 ? 'word' : 'words'}
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <Type className="mr-1 h-3.5 w-3.5" />
          {stats.characters}{' '}
          {stats.characters === 1 ? 'character' : 'characters'}
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <MessageSquare className="mr-1 h-3.5 w-3.5" />
          {stats.sentences} {stats.sentences === 1 ? 'sentence' : 'sentences'}
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <AlignLeft className="mr-1 h-3.5 w-3.5" />
          {stats.paragraphs}{' '}
          {stats.paragraphs === 1 ? 'paragraph' : 'paragraphs'}
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <BookOpen className="mr-1 h-3.5 w-3.5" />
          ~{stats.readingTime} min read
        </Badge>
        <Badge
          variant="outline"
          className="border-emerald-200 bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
        >
          <Clock className="mr-1 h-3.5 w-3.5" />
          ~{stats.speakingTime} min speak
        </Badge>
      </div>
    </div>
  )
}