'use client'

import { useEffect, useRef, useState } from 'react'

export function useAudioRecorder(onStop?: (blob: Blob) => void) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const isRecordingRef = useRef(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordedTime, setRecordedTime] = useState(0)

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' })
        onStop?.(audioBlob)
      }

      mediaRecorder.start()
      isRecordingRef.current = true
      setIsRecording(true)
      setRecordedTime(0)

      timerRef.current = setInterval(() => {
        setRecordedTime((prev) => prev + 1)
      }, 1000)
    } catch {
      window.alert('Erro ao acessar o microfone. Verifique as permissões do navegador.')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      mediaRecorderRef.current.stop()
      streamRef.current?.getTracks().forEach((track) => track.stop())

      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      isRecordingRef.current = false
      setIsRecording(false)
    }
  }

  const formatTime = (seconds: number): string => {
    if (Number.isNaN(seconds)) return '00:00'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      streamRef.current?.getTracks().forEach((track) => track.stop())
    }
  }, [])

  return {
    isRecording,
    formattedTime: formatTime(recordedTime),
    startRecording,
    stopRecording,
  }
}