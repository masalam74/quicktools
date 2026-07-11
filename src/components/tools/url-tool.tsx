'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Badge } from '@/components/ui/badge'
import { Link, Copy, Trash2, Globe } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function UrlTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const { toast } = useToast()

  const { output, error } = useMemo(() => {
    if (!input.trim()) {
      return { output: '', error: '' }
    }

    try {
      if (mode === 'encode') {
        return { output: encodeURIComponent(input), error: '' }
      } else {
        return { output: decodeURIComponent(input), error: '' }
      }
    } catch {
      return {
        output: '',
        error:
          mode === 'decode'
            ? 'Invalid URL-encoded input. The string contains malformed percent-encoding sequences.'
            : 'An unexpected error occurred during URL encoding.',
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
            <Globe className="h-4 w-4" />
          </div>
          URL Encoder / Decoder
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
            className="data-[state=on]:bg-emerald-600 data-[state=on]:text-white"
          >
            <Link className="h-4 w-4 mr-1.5" />
            Encode
          </ToggleGroupItem>
          <ToggleGroupItem
            value="decode"
            className="data-[state=on]:bg-emerald-600 data-[state=on]:text-white"
          >
            <Globe className="h-4 w-4 mr-1.5" />
            Decode
          </ToggleGroupItem>
        </ToggleGroup>

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            {mode === 'encode' ? 'Text to Encode' : 'URL-Encoded Text to Decode'}
          </label>
          <Textarea
            placeholder={
              mode === 'encode'
                ? 'Enter text to URL-encode... e.g., hello world & foo=bar'
                : 'Enter URL-encoded text to decode... e.g., hello%20world%20%26%20foo%3Dbar'
            }
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[120px] font-mono text-sm focus:ring-emerald-500 focus:border-emerald-500"
          />
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/50 dark:text-red-400">
            {error}
          </div>
        )}

        <div>
          <label className="text-sm font-medium mb-1.5 block">
            {mode === 'encode' ? 'Encoded Output' : 'Decoded Output'}
          </label>
          <Textarea
            readOnly
            value={output}
            placeholder={
              mode === 'encode'
                ? 'Encoded result will appear here...'
                : 'Decoded result will appear here...'
            }
            className="min-h-[120px] font-mono text-sm bg-muted/50"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            onClick={handleCopy}
            disabled={!output}
            variant="outline"
            className="gap-1.5"
          >
            <Copy className="h-4 w-4" />
            Copy Output
          </Button>
          <Button onClick={handleClear} variant="outline" className="gap-1.5 hover:text-red-600 hover:border-red-300">
            <Trash2 className="h-4 w-4" />
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2">
          <Badge variant="secondary">
            {mode === 'encode' ? 'Encoding' : 'Decoding'}
          </Badge>
          <span>
            {input.length > 0
              ? `${input.length} chars in → ${output.length} chars out`
              : 'Enter text above to convert'}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}