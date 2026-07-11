'use client'

import { useState, useCallback, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Progress } from '@/components/ui/progress'
import { useToast } from '@/hooks/use-toast'
import {
  Key,
  Copy,
  RefreshCw,
  Shield,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from 'lucide-react'

const CHAR_SETS = {
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
} as const

type CharSetKey = keyof typeof CHAR_SETS

function generateSecurePassword(
  length: number,
  options: Record<CharSetKey, boolean>,
): string {
  const activeSets = (Object.keys(CHAR_SETS) as CharSetKey[]).filter(
    (key) => options[key],
  )

  if (activeSets.length === 0) return ''

  const pool = activeSets.map((key) => CHAR_SETS[key]).join('')
  const array = new Uint32Array(length)

  // Guarantee at least one character from each active set
  const chars: string[] = []
  for (const key of activeSets) {
    const set = CHAR_SETS[key]
    const idx = crypto.getRandomValues(new Uint32Array(1))[0] % set.length
    chars.push(set[idx])
  }

  // Fill remaining slots from the full pool
  const remaining = length - chars.length
  if (remaining > 0) {
    crypto.getRandomValues(array)
    for (let i = 0; i < remaining; i++) {
      chars.push(pool[array[i] % pool.length])
    }
  }

  // Fisher-Yates shuffle
  for (let i = chars.length - 1; i > 0; i--) {
    const j = crypto.getRandomValues(new Uint32Array(1))[0] % (i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }

  return chars.join('')
}

interface StrengthResult {
  label: string
  value: number
  color: string
  bgColor: string
  borderColor: string
  icon: React.ReactNode
}

function evaluateStrength(
  password: string,
  options: Record<CharSetKey, boolean>,
): StrengthResult {
  const len = password.length
  const activeCount = Object.values(options).filter(Boolean).length

  let score = 0

  // Length scoring
  if (len >= 8) score += 1
  if (len >= 16) score += 1
  if (len >= 24) score += 1
  if (len >= 32) score += 1

  // Character variety scoring
  if (activeCount >= 2) score += 1
  if (activeCount >= 3) score += 1
  if (activeCount >= 4) score += 1

  // Max score = 7
  if (score <= 2 || !password) {
    return {
      label: 'Weak',
      value: 15,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      icon: <ShieldX className="h-4 w-4 text-red-500" />,
    }
  }
  if (score <= 3) {
    return {
      label: 'Medium',
      value: 40,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      icon: <ShieldAlert className="h-4 w-4 text-amber-500" />,
    }
  }
  if (score <= 5) {
    return {
      label: 'Strong',
      value: 70,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-500" />,
    }
  }
  return {
    label: 'Very Strong',
    value: 100,
    color: 'text-emerald-700',
    bgColor: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
    icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
  }
}

export default function PasswordGenerator() {
  const { toast } = useToast()

  const [length, setLength] = useState(16)
  const [options, setOptions] = useState<Record<CharSetKey, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  })
  const [regenKey, setRegenKey] = useState(0)

  // Derive password from settings; regenerate when settings change or user clicks Regenerate
  const password = useMemo(() => {
    return generateSecurePassword(length, options)
  }, [length, options, regenKey])

  const generate = useCallback(() => {
    setRegenKey((k) => k + 1)
  }, [])

  const strength = useMemo(
    () => evaluateStrength(password, options),
    [password, options],
  )

  const handleCopy = async () => {
    if (!password) return
    try {
      await navigator.clipboard.writeText(password)
      toast({
        title: 'Copied!',
        description: 'Password copied to clipboard.',
      })
    } catch {
      toast({
        title: 'Failed to copy',
        description: 'Please select and copy the password manually.',
        variant: 'destructive',
      })
    }
  }

  const toggleOption = (key: CharSetKey) => {
    setOptions((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      // Prevent disabling all options
      if (!next.uppercase && !next.lowercase && !next.numbers && !next.symbols) {
        return prev
      }
      return next
    })
  }

  const progressColor =
    strength.label === 'Weak'
      ? '[&>div]:bg-red-500'
      : strength.label === 'Medium'
        ? '[&>div]:bg-amber-500'
        : '[&>div]:bg-emerald-500'

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 border border-emerald-200">
            <Key className="h-5 w-5 text-emerald-600" />
          </div>
          Password Generator
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Password Display */}
        <div
          className={`relative flex items-center justify-between rounded-lg border-2 p-4 transition-colors ${strength.borderColor} ${strength.bgColor}`}
        >
          <p className="font-mono text-lg sm:text-xl tracking-wide break-all pr-12 min-h-[1.75rem] text-gray-800 select-all">
            {password || (
              <span className="text-gray-400 italic">Select at least one option</span>
            )}
          </p>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={handleCopy}
              disabled={!password}
              aria-label="Copy password"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50"
              onClick={generate}
              aria-label="Regenerate password"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Character Count */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Character count</span>
          <span className="font-medium tabular-nums text-gray-700">{password.length}</span>
        </div>

        {/* Strength Indicator */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Strength</span>
            <div className="flex items-center gap-1.5">
              {strength.icon}
              <span className={`font-medium ${strength.color}`}>
                {strength.label}
              </span>
            </div>
          </div>
          <Progress
            value={strength.value}
            className={`h-2 ${progressColor}`}
          />
        </div>

        {/* Length Slider */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-gray-700">
              Password Length
            </Label>
            <span className="text-sm font-semibold tabular-nums rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 px-2 py-0.5">
              {length}
            </span>
          </div>
          <Slider
            value={[length]}
            onValueChange={(val) => setLength(val[0])}
            min={8}
            max={128}
            step={1}
            className="[&_[role=slider]]:bg-emerald-600 [&_[role=slider]]:border-emerald-600 [&>span:first-child]:bg-emerald-200"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>8</span>
            <span>128</span>
          </div>
        </div>

        {/* Character Options */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-gray-700">
            Character Types
          </Label>
          <div className="grid grid-cols-2 gap-3">
            {(
              [
                { key: 'uppercase' as CharSetKey, label: 'Uppercase', example: 'A-Z' },
                { key: 'lowercase' as CharSetKey, label: 'Lowercase', example: 'a-z' },
                { key: 'numbers' as CharSetKey, label: 'Numbers', example: '0-9' },
                { key: 'symbols' as CharSetKey, label: 'Symbols', example: '!@#$%' },
              ] as const
            ).map(({ key, label, example }) => (
              <label
                key={key}
                className={`flex items-center gap-3 rounded-lg border-2 px-3 py-2.5 cursor-pointer transition-colors ${
                  options[key]
                    ? 'border-emerald-300 bg-emerald-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <Checkbox
                  checked={options[key]}
                  onCheckedChange={() => toggleOption(key)}
                  className="data-[state=checked]:bg-emerald-600 data-[state=checked]:border-emerald-600"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                  <span className="text-xs text-gray-400 font-mono">{example}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Generate Button */}
        <Button
          onClick={generate}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Generate Password
        </Button>

        {/* Security Note */}
        <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 p-3">
          <Shield className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <p className="text-xs text-gray-600 leading-relaxed">
            Passwords are generated locally using <code className="font-mono text-emerald-700 bg-emerald-100 px-1 rounded">crypto.getRandomValues</code> and are never sent to any server.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}