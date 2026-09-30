import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  PhoneOff, 
  MessageSquare, 
  Music, 
  Volume2, 
  Clock, 
  Send, 
  X, 
  Maximize2, 
  Minimize2, 
  Users, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  Radio,
  Share2
} from 'lucide-react';

interface ClassroomWindowProps {
  roomCode: string;
  studentName: string;
  courseTitle: string;
  onClose: () => void;
}

export const ClassroomWindow: React.FC<ClassroomWindowProps> = ({
  roomCode,
  studentName,
  courseTitle,
  onClose
}) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [highFidelityAudio, setHighFidelityAudio] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pianoActiveNote, setPianoActiveNote] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string; isTeacher?: boolean }>>([
    { sender: 'استاد نگار احمدی', text: 'سلام به استودیوی آنلاین چنگ خوش آمدید. لطفا موقع همنوازی زاویه دوربین روی کلاویه‌ها/ساز باشد.', time: '۱۰:۰۰', isTeacher: true },
    { sender: 'پشتیبانی فنی', text: 'سرور پینگ اختصاصی خوزستان متصل شد (۲۴ms). صدای High-Fi فعال است.', time: '۱۰:۰۱' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [bpm, setBpm] = useState(80);
  const [isPlayingMetronome, setIsPlayingMetronome] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Metronome audio synthesizer using Web Audio API
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlayingMetronome) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const playTick = () => {
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.frequency.value = 1000;
          gain.gain.value = 0.3;
          osc.start();
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
          osc.stop(audioCtx.currentTime + 0.08);
        };
        interval = setInterval(playTick, (60 / bpm) * 1000);
      } catch {
        // audio context fallback
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlayingMetronome, bpm]);

  // Webcam stream activation
  useEffect(() => {
    if (isVideoOn) {
      navigator.mediaDevices?.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          mediaStreamRef.current = stream;
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          setIsVideoOn(false);
        });
    } else {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
        mediaStreamRef.current = null;
      }
    }
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, [isVideoOn]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const now = new Intl.DateTimeFormat('fa-IR', { hour: '2-digit', minute: '2-digit' }).format(new Date());
    setChatMessages(prev => [...prev, { sender: studentName || 'هنرجو', text: inputMsg.trim(), time: now }]);
    setInputMsg('');
  };

  const copyRoomLink = () => {
    const link = `https://chang-music.ir/live-room/${roomCode}`;
    navigator.clipboard?.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const pianoKeys = [
    { note: 'C4', label: 'دو', isBlack: false },
    { note: 'C#4', label: 'دو#', isBlack: true },
    { note: 'D4', label: 'ر', isBlack: false },
    { note: 'D#4', label: 'ر#', isBlack: true },
    { note: 'E4', label: 'می', isBlack: false },
    { note: 'F4', label: 'فا', isBlack: false },
    { note: 'F#4', label: 'فا#', isBlack: true },
    { note: 'G4', label: 'سل', isBlack: false },
    { note: 'G#4', label: 'سل#', isBlack: true },
    { note: 'A4', label: 'لا', isBlack: false },
    { note: 'A#4', label: 'لا#', isBlack: true },
    { note: 'B4', label: 'سی', isBlack: false },
    { note: 'C5', label: 'دو', isBlack: false },
  ];

  const playSynthNote = (note: string) => {
    setPianoActiveNote(note);
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const freqs: Record<string, number> = {
        'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13,
        'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00,
        'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88, 'C5': 523.25
      };
      osc.type = 'triangle';
      osc.frequency.value = freqs[note] || 440;
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // fallback
    }
    setTimeout(() => setPianoActiveNote(null), 300);
  };

  return (
    <div 
      ref={modalContainerRef}
      className="fixed inset-0 z-[100] bg-[#0A0C10] text-white flex flex-col overflow-hidden animate-fade-in font-sans"
      role="dialog"
      aria-modal="true"
    >
      {/* Dedicated App Bar */}
      <div className="bg-[#12141A] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#B92B3A] text-white flex items-center justify-center font-bold text-[15px] shadow-sm">
            چنگ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-[15px] sm:text-[16px] font-bold text-white">
                پنجره اتاق زنده: {courseTitle}
              </h2>
              <span className="flex items-center gap-1 bg-red-600/20 text-red-400 text-[11px] font-mono px-2 py-0.5 rounded-full border border-red-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>LIVE</span>
              </span>
            </div>
            <p className="text-[12px] text-gray-400">
              هنرجو: {studentName} · شناسه اتاق: <span className="font-mono text-gray-300">{roomCode}</span>
            </p>
          </div>
        </div>

        {/* Room Tools & Close */}
        <div className="flex items-center gap-2">
          {/* Copy Link Button */}
          <button
            type="button"
            onClick={copyRoomLink}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[12px] text-gray-300 flex items-center gap-1.5 transition-colors"
            title="کپی لینک اختصاصی ورود به این اتاق"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedLink ? 'لینک کپی شد' : 'کپی لینک اتاق'}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-300 transition-colors"
            title={isFullscreen ? 'خروج از تمام‌صفحه' : 'تمام‌صفحه'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Leave/Exit Window */}
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-red-600/90 hover:bg-red-700 text-white font-bold text-[12px] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>خروج از پنجره کلاس</span>
          </button>
        </div>
      </div>

      {/* Main Classroom Workspace Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        
        {/* Left 8 Cols: Video feeds, Piano, Metronome & Controls */}
        <div className="lg:col-span-8 p-3 sm:p-5 flex flex-col justify-between overflow-y-auto border-b lg:border-b-0 lg:border-l border-white/10">
          
          {/* Feeds */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 min-h-[280px]">
            
            {/* Teacher Video Feed */}
            <div className="relative rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex flex-col justify-between p-3 group aspect-video sm:aspect-auto">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80" 
                alt="استاد نگار احمدی"
                className="absolute inset-0 w-full h-full object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

              <div className="relative z-10 flex justify-between items-center text-[12px]">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>تصویر استاد (خرمشهر)</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md p-1.5 rounded-full">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                </span>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-gray-300">
                <span>زاویه دید دست‌ها و ساز</span>
                <span className="font-mono text-emerald-400">48kHz High-Fi</span>
              </div>
            </div>

            {/* Student Video Feed */}
            <div className="relative rounded-2xl overflow-hidden bg-[#12141A] border border-white/10 flex flex-col justify-between p-3 aspect-video sm:aspect-auto">
              {isVideoOn ? (
                <video 
                  ref={localVideoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                    <VideoOff className="w-6 h-6 text-gray-500" />
                  </div>
                  <p className="text-[13px] font-medium text-gray-300">تصویر شما خاموش است</p>
                  <p className="text-[11px] text-gray-500 mt-1">جهت بررسی پوزیسیون ساز دوربین را روشن نمایید</p>
                </div>
              )}

              <div className="relative z-10 flex justify-between items-center text-[12px]">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${isVideoOn ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                  <span>تصویر شما ({studentName})</span>
                </span>
                <span className="bg-black/60 backdrop-blur-md p-1.5 rounded-full">
                  {isMicOn ? <Mic className="w-3.5 h-3.5 text-emerald-400" /> : <MicOff className="w-3.5 h-3.5 text-red-400" />}
                </span>
              </div>

              <div className="relative z-10 text-[11px] text-gray-400 font-mono">
                اتصال مستقیم WebRTC
              </div>
            </div>

          </div>

          {/* Interactive Virtual Piano */}
          <div className="mt-3 pt-3 border-t border-white/10 select-none">
            <div className="flex items-center justify-between mb-1.5 text-[12px]">
              <span className="font-bold text-gray-300 flex items-center gap-1.5">
                <Music className="w-3.5 h-3.5 text-[#B92B3A]" />
                <span>کلاویه‌های پیانوی مجازی برای سلفژ و دیاپازون کوک:</span>
              </span>
              <span className="text-[11px] text-gray-500 hidden sm:inline">برای شنیدن فرکانس دقیق کلیک کنید</span>
            </div>

            <div className="flex justify-center items-start overflow-x-auto py-1">
              <div className="relative flex bg-[#111317] p-1.5 rounded-xl border border-white/10 shadow-lg">
                {pianoKeys.map((key) => {
                  const isActive = pianoActiveNote === key.note;
                  if (key.isBlack) {
                    return (
                      <button
                        key={key.note}
                        type="button"
                        onClick={() => playSynthNote(key.note)}
                        className={`w-6 sm:w-7 h-16 sm:h-20 -mx-3 sm:-mx-3.5 z-20 rounded-b-md bg-[#242730] border border-black shadow-md transition-all active:scale-95 ${
                          isActive ? 'bg-[#B92B3A] ring-2 ring-[#B92B3A]' : 'hover:bg-[#343845]'
                        }`}
                        title={`نت ${key.label}`}
                      >
                        <span className="text-[8px] text-gray-300 block mt-10 sm:mt-12 font-mono">{key.label}</span>
                      </button>
                    );
                  }
                  return (
                    <button
                      key={key.note}
                      type="button"
                      onClick={() => playSynthNote(key.note)}
                      className={`w-8 sm:w-10 h-24 sm:h-28 rounded-b-lg bg-[#FAF0F1] border border-gray-300 transition-all active:scale-95 flex flex-col justify-end pb-1.5 items-center text-[#202124] ${
                        isActive ? 'bg-[#F3C7CA] ring-2 ring-[#B92B3A]' : 'hover:bg-white'
                      }`}
                      title={`نت ${key.label}`}
                    >
                      <span className="text-[10px] font-bold font-mono">{key.label}</span>
                      <span className="text-[8px] text-gray-500 font-mono">{key.note}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Bar: Audio, Metronome and Hardware Controls */}
          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsMicOn(!isMicOn)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isMicOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-600 text-white'
                }`}
                title={isMicOn ? 'قطع میکروفون' : 'وصل میکروفون'}
              >
                {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsVideoOn(!isVideoOn)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                  isVideoOn ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-red-600 text-white'
                }`}
                title={isVideoOn ? 'خاموش کردن دوربین' : 'روشن کردن دوربین'}
              >
                {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setHighFidelityAudio(!highFidelityAudio)}
                className={`px-3 py-2 rounded-xl text-[12px] font-bold flex items-center gap-1.5 transition-all ${
                  highFidelityAudio 
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                    : 'bg-white/5 text-gray-400 border border-white/10'
                }`}
                title="غیرفعال کردن نویزگیر تلفنی جهت شفافیت کامل طنین ساز"
              >
                <Music className="w-3.5 h-3.5" />
                <span>حالت صدای ساز (High-Fi): {highFidelityAudio ? 'روشن' : 'خاموش'}</span>
              </button>
            </div>

            {/* Metronome Sync */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlayingMetronome(!isPlayingMetronome)}
                className={`px-3.5 py-2 rounded-xl text-[12px] font-bold flex items-center gap-2 transition-all ${
                  isPlayingMetronome ? 'bg-amber-600 text-white animate-pulse' : 'bg-white/10 hover:bg-white/20 text-gray-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>مترونوم ({bpm} BPM)</span>
              </button>

              <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/10 text-[12px]">
                <button 
                  type="button" 
                  onClick={() => setBpm(b => Math.max(40, b - 5))}
                  className="text-gray-400 hover:text-white px-1 font-mono"
                >
                  -
                </button>
                <span className="font-mono text-emerald-400 font-bold">{bpm}</span>
                <button 
                  type="button" 
                  onClick={() => setBpm(b => Math.min(220, b + 5))}
                  className="text-gray-400 hover:text-white px-1 font-mono"
                >
                  +
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right 4 Cols: Live Chat, Exercise Notes, Room Info */}
        <div className="lg:col-span-4 bg-[#12141A] p-4 flex flex-col justify-between text-right">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-[14px] font-bold flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[#B92B3A]" />
                <span>گفت‌وگوی متنی و ارسال تمرین</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>۲ نفر حاضر</span>
              </span>
            </div>

            {/* Chat List */}
            <div className="space-y-3 py-3 overflow-y-auto max-h-[calc(100vh-270px)] sm:max-h-[380px]">
              {chatMessages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-2xl text-[12px] leading-relaxed ${
                    msg.isTeacher 
                      ? 'bg-[#B92B3A]/20 border border-[#B92B3A]/30 text-white mr-auto max-w-[92%]'
                      : 'bg-white/5 border border-white/10 text-gray-300 ml-auto max-w-[92%]'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] text-gray-400 mb-1">
                    <span className="font-bold text-[#FFB3BA]">{msg.sender}</span>
                    <span className="font-mono">{msg.time}</span>
                  </div>
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="pt-3 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="ارسال پیام یا سوال فنی به استاد..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-[13px] text-white focus:outline-none focus:border-[#B92B3A]"
            />
            <button
              type="submit"
              className="w-9 h-9 rounded-xl bg-[#B92B3A] hover:bg-[#A52432] text-white flex items-center justify-center shrink-0 transition-colors"
              aria-label="ارسال پیام"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>

    </div>
  );
};
