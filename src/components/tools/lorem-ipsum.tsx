'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { FileText, Copy, RefreshCw, AlignJustify } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo',
  'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint',
  'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'semper', 'ligula',
  'viverra', 'maecenas', 'accumsan', 'lacus', 'vel', 'facilisis', 'volutpat',
  'donec', 'vitae', 'sapien', 'pellentesque', 'habitant', 'morbi', 'tristique',
  'senectus', 'netus', 'fames', 'turpis', 'egestas', 'proin', 'gravida',
  'hendrerit', 'lectus', 'arcu', 'bibendum', 'at', 'varius', 'diam', 'sollicitudin',
  'tempus', 'quam', 'pellentesque', 'nec', 'nam', 'aliquam', 'ultrices', 'sagittis',
  'orci', 'leo', 'porta', 'risus', 'ac', 'cursus', 'auctor', 'eu', 'augue',
  'urna', 'iaculis', 'massa', 'tincidunt', 'dui', 'convallis', 'tortor', 'posuere',
  'sollicitudin', 'aliquam', 'ultrices', 'sagittis', 'orci', 'porta', 'risus',
]

const LOREM_OPENING = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateSentence(): string {
  const words: string[] = []
  const count = getRandomInt(6, 16)
  for (let i = 0; i < count; i++) {
    words.push(LOREM_WORDS[getRandomInt(0, LOREM_WORDS.length - 1)])
  }
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1)
  return words.join(' ') + '.'
}

function generateParagraph(startWithLorem: boolean): string {
  const sentenceCount = getRandomInt(3, 7)
  const sentences: string[] = []

  if (startWithLorem) {
    sentences.push(LOREM_OPENING)
  }

  for (let i = sentences.length; i < sentenceCount; i++) {
    sentences.push(generateSentence())
  }

  return sentences.join(' ')
}

function generateText(paragraphs: number, startWithLorem: boolean): string {
  const result: string[] = []
  for (let i = 0; i < paragraphs; i++) {
    const shouldStart = startWithLorem && i === 0
    result.push(generateParagraph(shouldStart))
  }
  return result.join('\n\n')
}

export default function LoremIpsum() {
  const [paragraphCount, setParagraphCount] = useState<number>(3)
  const [startWithLorem, setStartWithLorem] = useState<boolean>(true)
  const [output, setOutput] = useState<string>('')
  const { toast } = useToast()

  const handleGenerate = useCallback(() => {
    const text = generateText(paragraphCount, startWithLorem)
    setOutput(text)
  }, [paragraphCount, startWithLorem])

  const handleRegenerate = useCallback(() => {
    const text = generateText(paragraphCount, startWithLorem)
    setOutput(text)
    toast({
      title: 'Regenerated',
      description: 'New lorem ipsum text has been generated.',
    })
  }, [paragraphCount, startWithLorem, toast])

  const handleCopy = useCallback(async () => {
    if (!output) {
      toast({
        title: 'Nothing to copy',
        description: 'Generate some text first.',
        variant: 'destructive',
      })
      return
    }
    try {
      await navigator.clipboard.writeText(output)
      toast({
        title: 'Copied to clipboard',
        description: 'Lorem ipsum text has been copied.',
      })
    } catch {
      toast({
        title: 'Copy failed',
        description: 'Could not copy text. Please select and copy manually.',
        variant: 'destructive',
      })
    }
  }, [output, toast])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Card className="border-emerald-200 bg-white shadow-sm">
        <CardHeader className="border-b border-emerald-100">
          <CardTitle className="flex items-center gap-2.5 text-emerald-800">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50">
              <FileText className="h-5 w-5 text-emerald-600" />
            </div>
            Lorem Ipsum Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          {/* Paragraph Count Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="paragraph-slider"
                className="text-sm font-medium text-gray-700"
              >
                Number of Paragraphs
              </Label>
              <span className="rounded-md bg-emerald-50 px-2.5 py-0.5 text-sm font-semibold tabular-nums text-emerald-700">
                {paragraphCount}
              </span>
            </div>
            <Slider
              id="paragraph-slider"
              min={1}
              max={20}
              step={1}
              value={[paragraphCount]}
              onValueChange={(val) => setParagraphCount(val[0])}
              className="w-full [&_[role=slider]]:border-emerald-600 [&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:focus-visible:ring-emerald-400 [&>span:first-child]:bg-emerald-200"
            />
            <div className="flex justify-between text-xs text-gray-400">
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          {/* Start with Lorem Toggle */}
          <div className="flex items-center justify-between rounded-lg border border-emerald-100 bg-emerald-50/50 px-4 py-3">
            <Label
              htmlFor="start-lorem-switch"
              className="cursor-pointer text-sm font-medium text-gray-700"
            >
              Start with &ldquo;Lorem ipsum dolor sit amet&hellip;&rdquo;
            </Label>
            <Switch
              id="start-lorem-switch"
              checked={startWithLorem}
              onCheckedChange={setStartWithLorem}
              className="data-[state=checked]:bg-emerald-600"
            />
          </div>

          {/* Generate Button */}
          <Button
            onClick={handleGenerate}
            className="w-full bg-emerald-600 text-white hover:bg-emerald-700 focus-visible:ring-emerald-400 active:bg-emerald-800"
            size="lg"
          >
            <AlignJustify className="mr-2 h-4 w-4" />
            Generate
          </Button>
        </CardContent>
      </Card>

      {/* Output Area */}
      {output && (
        <Card className="border-emerald-200 bg-white shadow-sm">
          <CardHeader className="border-b border-emerald-100 pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-medium text-emerald-800">
                Generated Text
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRegenerate}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                  Regenerate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  <Copy className="mr-1.5 h-3.5 w-3.5" />
                  Copy
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-5">
            <div className="max-h-[28rem] overflow-y-auto rounded-lg border border-emerald-100 bg-gray-50/80 p-5">
              {output.split('\n\n').map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-4 text-sm leading-relaxed text-gray-700 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <p className="mt-3 text-xs text-gray-400">
              {output.split(/\s+/).filter(Boolean).length} words &middot;{' '}
              {paragraphCount} {paragraphCount === 1 ? 'paragraph' : 'paragraphs'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}