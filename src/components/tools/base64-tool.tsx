'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Badge } from '@/components/ui/badge'
import { Binary, Copy, Trash2, Lock, Unlock } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const { toast } = useToast()

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: '', error: '' }
    }

    try {
      if (mode === 'encode') {
        const encoded = btoa(
          encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, p1) =>
            String.fromCharCode(parseInt(p1, 16))
          )
        )
        return { output: encoded, error: '' }
      } else {
        const decoded = decodeURIComponent(
          Array.from(atob(input), (c) =>
            '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          ).join('')
        )
        return { output: decoded, error: '' }
      }
    } catch {
      return {
        output: '',
        error:
          mode === 'decode'
            ? 'Invalid Base64 input. Please check your string and try again.'
            : 'An unexpected error occurred during encoding.',
      }
    }
  }, [input, mode])

  const handleModeChange = (value: string) => {
    if (value === 'encode' || value === 'decode') {
      setMode(value)
    }
  }

  const handleCopy = async () => {
    if (!output) return
    try {
      await navigator.clipboard.writeText(output)
      toast({
        title: 'Copied!',
        description: 'Output copied to clipboard.',
      })
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please select and copy the text manually.',
        variant: 'destructive',
      })
    }
  }

  const handleClear = () => {
    setInput('')
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-400">
            <Binary className="h-4 w-4" />
          </div>
          Base64 Encoder / Decoder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={handleModeChange}
          className="justify-start"
        >
          <ToggleGroupItem
            value="encode"
            aria-label="Encode mode"
            className="data-[state=on]:bg-emerald-600 data-[state=on]:text-white data-[state=on]:hover:bg-emerald-700 transition-colors px-5"
          >
            <Lock className="w-4 h-4 mr-2" />
            Encode
          </ToggleGroupItem>
          <ToggleGroupItem
            value="decode"
            aria-label="Decode mode"
            className="data-[state=on]:bg-emerald-600 data-[state=on]:text-white data-[state=on]:hover:bg-emerald-700 transition-colors px-5"
          >
            <Unlock className="w-4 h-4 mr-2" />
            Decode
          </ToggleGroupItem>
        </ToggleGroup>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
          </label>
          <Textarea
            placeholder={
              mode === 'encode'
                ? 'Enter text to encode to Base64...'
                : 'Paste your Base64 string here...'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[140px] font-mono text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
          </label>
          <Textarea
            readOnly
            value={output}
            placeholder={
              error
                ? ''
                : mode === 'encode'
                ? 'Base64 result will appear here...'
                : 'Decoded text will appear here...'
            }
            className="min-h-[140px] font-mono text-sm bg-muted/50"
          />
        </div>

        <div className="flex items-center gap-2 pt-1">
          <Button
            variant="outline"
            onClick={handleCopy}
            disabled={!output}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Output
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="hover:text-red-600 hover:border-red-300"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear
          </Button>
          <Badge variant="secondary" className="ml-auto">
            {mode === 'encode' ? (
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> Encoding
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Unlock className="w-3 h-3" /> Decoding
              </span>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}