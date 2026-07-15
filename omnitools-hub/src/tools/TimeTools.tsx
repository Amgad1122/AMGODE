import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Trash2, Clock, Calendar, Check, AlertCircle } from 'lucide-react';

export function TimeTools({ toolId, lang = 'en' }: { toolId: number; lang?: 'en' | 'ar' }) {
  const isAr = lang === 'ar';

  switch (toolId) {
    case 61: return <PomodoroTimer isAr={isAr} />;
    case 62: return <Stopwatch isAr={isAr} />;
    case 63: return <TimezoneConverter isAr={isAr} />;
    case 64: return <ExactAgeCalculator isAr={isAr} />;
    case 65: return <WorkingDaysCalculator isAr={isAr} />;
    case 66: return <CountdownTimer isAr={isAr} />;
    case 67: return <DateConverter isAr={isAr} />;
    case 68: return <TimeDurationCalculator isAr={isAr} />;
    case 69: return <WeeklySchedulePlanner isAr={isAr} />;
    case 70: return <TodoListTool isAr={isAr} />;
    default: return null;
  }
}

// 61. Pomodoro Timer
function PomodoroTimer({ isAr }: { isAr: boolean }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Trigger native Speech Synthesis or standard Beep alert as a 100% self-contained alarm
      try {
        const msg = new SpeechSynthesisUtterance(isBreak ? "Time to get back to work!" : "Take a short break!");
        window.speechSynthesis.speak(msg);
      } catch (e) {}
      setIsBreak(!isBreak);
      setTimeLeft((isBreak ? workTime : breakTime) * 60);
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, workTime, breakTime]);

  const handleReset = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center py-6">
      <span className="text-sm font-semibold tracking-wider text-emerald-400 uppercase">
        {isBreak 
          ? (isAr ? "فترة الاستراحة 🌸" : "Break Session 🌸") 
          : (isAr ? "فترة التركيز 🎯" : "Focus Session 🎯")}
      </span>
      
      <div className="text-7xl font-mono text-white tracking-widest tabular-nums bg-gray-950 px-8 py-6 rounded-2xl border border-gray-800 shadow-lg shadow-indigo-500/10">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setIsActive(!isActive)} 
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center gap-2 text-white ${isActive ? 'bg-orange-600 hover:bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
        >
          {isActive ? <Pause size={18} /> : <Play size={18} />}
          <span>{isActive ? (isAr ? "إيقاف" : "Pause") : (isAr ? "ابدأ" : "Start")}</span>
        </button>
        <button 
          onClick={handleReset} 
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold text-base transition-all active:scale-95 flex items-center gap-2"
        >
          <RotateCcw size={18} />
          <span>{isAr ? "إعادة تعيين" : "Reset"}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 w-full max-w-xs pt-4 border-t border-gray-800">
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-500">{isAr ? "دقائق العمل" : "Focus Duration"}</label>
          <input 
            type="number" 
            value={workTime} 
            onChange={e => {setWorkTime(parseInt(e.target.value) || 25); if(!isActive && !isBreak) setTimeLeft((parseInt(e.target.value) || 25)*60);}} 
            className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded font-mono text-white text-sm" 
          />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-500">{isAr ? "دقائق الاستراحة" : "Break Duration"}</label>
          <input 
            type="number" 
            value={breakTime} 
            onChange={e => setBreakTime(parseInt(e.target.value) || 5)} 
            className="w-full px-3 py-1.5 bg-gray-900 border border-gray-800 rounded font-mono text-white text-sm" 
          />
        </div>
      </div>
    </div>
  );
}

// 62. Stopwatch
function Stopwatch({ isAr }: { isAr: boolean }) {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (running) {
      startTimeRef.current = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [running]);

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}.${centi.toString().padStart(2, '0')}`;
  };

  const handleLap = () => {
    setLaps(prev => [time, ...prev]);
  };

  const handleReset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 text-center py-6">
      <div className="text-6xl font-mono text-white tracking-wider tabular-nums bg-gray-950 px-8 py-6 rounded-2xl border border-gray-800 shadow-lg">
        {formatTime(time)}
      </div>

      <div className="flex gap-4">
        <button 
          onClick={() => setRunning(!running)} 
          className={`px-6 py-3 rounded-xl font-bold text-base transition-all active:scale-95 flex items-center gap-2 text-white ${running ? 'bg-orange-600 hover:bg-orange-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
        >
          {running ? <Pause size={18} /> : <Play size={18} />}
          <span>{running ? (isAr ? "إيقاف مؤقت" : "Pause") : (isAr ? "تشغيل" : "Start")}</span>
        </button>
        {running && (
          <button 
            onClick={handleLap} 
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-base transition-all active:scale-95"
          >
            {isAr ? "جولة (Lap)" : "Lap"}
          </button>
        )}
        <button 
          onClick={handleReset} 
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold text-base transition-all active:scale-95"
        >
          {isAr ? "إعادة ضبط" : "Reset"}
        </button>
      </div>

      {laps.length > 0 && (
        <div className="w-full max-w-sm max-h-48 overflow-y-auto bg-gray-900 border border-gray-800 rounded-lg p-3 scrollbar-none">
          <h4 className="text-xs text-gray-500 text-start border-b border-gray-800 pb-1.5 mb-2 font-semibold">
            {isAr ? "الجولات المسجلة" : "Recorded Laps"}
          </h4>
          <div className="space-y-1">
            {laps.map((lapTime, i) => (
              <div key={i} className="flex justify-between font-mono text-sm text-gray-300">
                <span>{isAr ? `جولة ${laps.length - i}` : `Lap ${laps.length - i}`}</span>
                <span>{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 63. Timezone Converter
function TimezoneConverter({ isAr }: { isAr: boolean }) {
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date();
    // Format to local ISO without Z
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(Date.now() - offset)).toISOString().slice(0, 16);
    return localISOTime;
  });

  const [fromTz, setFromTz] = useState('Local');
  const [toTz, setToTz] = useState('Asia/Riyadh');

  const timezones = [
    { value: 'Local', label: isAr ? 'الوقت المحلي الحالي' : 'Local Time' },
    { value: 'UTC', label: 'UTC (GMT)' },
    { value: 'Europe/London', label: 'Europe/London (BST/GMT)' },
    { value: 'America/New_York', label: 'America/New_York (EST)' },
    { value: 'Asia/Riyadh', label: 'Asia/Riyadh (AST)' },
    { value: 'Asia/Dubai', label: 'Asia/Dubai (GST)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney (AEST)' }
  ];

  const getConvertedTime = () => {
    if (!dateTime) return '';
    const dateObj = new Date(dateTime);
    if (isNaN(dateObj.getTime())) return '';

    try {
      const options: Intl.DateTimeFormatOptions = {
        dateStyle: 'full',
        timeStyle: 'medium',
        hour12: true
      };

      if (toTz !== 'Local') {
        options.timeZone = toTz;
      }

      return new Intl.DateTimeFormat(isAr ? 'ar-SA' : 'en-US', options).format(dateObj);
    } catch (e) {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400">
            {isAr ? "تحديد التاريخ والوقت" : "Select Date & Time"}
          </label>
          <input
            type="datetime-local"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-gray-400">
            {isAr ? "التحويل إلى المنطقة الزمنية" : "Convert To Timezone"}
          </label>
          <select
            value={toTz}
            onChange={(e) => setToTz(e.target.value)}
            className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white focus:outline-none focus:border-indigo-500"
          >
            {timezones.map(tz => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 text-center space-y-2">
        <span className="text-xs uppercase text-gray-500 tracking-wider font-semibold">
          {isAr ? "الوقت المحول" : "Converted Time Output"}
        </span>
        <div className="text-xl md:text-2xl font-bold text-emerald-400">
          {getConvertedTime() || (isAr ? "يرجى تحديد وقت صالح" : "Please select a valid time")}
        </div>
      </div>
    </div>
  );
}

// 64. Exact Age Calculator
function ExactAgeCalculator({ isAr }: { isAr: boolean }) {
  const [birthdate, setBirthdate] = useState('1998-05-15');
  const [birthtime, setBirthtime] = useState('09:00');
  const [age, setAge] = useState<{ y: number; m: number; d: number; h: number; min: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!birthdate) return;
      const birth = new Date(`${birthdate}T${birthtime || '00:00'}`);
      const now = new Date();
      const diffMs = now.getTime() - birth.getTime();
      
      if (diffMs < 0) {
        setAge(null);
        return;
      }

      // Exact years
      let years = now.getFullYear() - birth.getFullYear();
      let months = now.getMonth() - birth.getMonth();
      let days = now.getDate() - birth.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += prevMonth.getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }

      const hours = now.getHours() - birth.getHours();
      let realHours = hours;
      let realMins = now.getMinutes() - birth.getMinutes();
      let realSecs = now.getSeconds() - birth.getSeconds();

      if (realSecs < 0) {
        realSecs += 60;
        realMins--;
      }
      if (realMins < 0) {
        realMins += 60;
        realHours--;
      }
      if (realHours < 0) {
        realHours += 24;
        // Adjusted days previously
      }

      setAge({ y: years, m: months, d: days, h: realHours, min: realMins, s: realSecs });
    }, 1000);

    return () => clearInterval(timer);
  }, [birthdate, birthtime]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "تاريخ الميلاد" : "Birth Date"}</label>
          <input type="date" value={birthdate} onChange={e => setBirthdate(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "وقت الميلاد (اختياري)" : "Birth Time (Optional)"}</label>
          <input type="time" value={birthtime} onChange={e => setBirthtime(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
      </div>

      {age ? (
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-4">
          {[
            { label: isAr ? 'سنة' : 'Years', val: age.y },
            { label: isAr ? 'شهر' : 'Months', val: age.m },
            { label: isAr ? 'يوم' : 'Days', val: age.d },
            { label: isAr ? 'ساعة' : 'Hours', val: age.h },
            { label: isAr ? 'دقيقة' : 'Mins', val: age.min },
            { label: isAr ? 'ثانية' : 'Secs', val: age.s }
          ].map((item, i) => (
            <div key={i} className="bg-gray-900/60 border border-gray-800 p-3 rounded-xl text-center shadow-md">
              <span className="block text-2xl md:text-3xl font-mono font-extrabold text-emerald-400 tabular-nums">{item.val}</span>
              <span className="text-xs text-gray-400 mt-1 block">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">
          {isAr ? "يرجى إدخال تاريخ ميلاد صحيح في الماضي." : "Please select a valid birthdate in the past."}
        </div>
      )}
    </div>
  );
}

// 65. Working Days Calculator
function WorkingDaysCalculator({ isAr }: { isAr: boolean }) {
  const [startDate, setStartDate] = useState('2026-07-01');
  const [endDate, setEndDate] = useState('2026-07-31');
  const [excludeWeekends, setExcludeWeekends] = useState(true);
  const [weekendType, setWeekendType] = useState<'sat-sun' | 'fri-sat'>('sat-sun');

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || start > end) return { total: 0, working: 0, weekends: 0 };

    let totalDays = 0;
    let workingDays = 0;
    let weekendDays = 0;

    let current = new Date(start);
    while (current <= end) {
      totalDays++;
      const dayOfWeek = current.getDay(); // 0 is Sunday, 6 is Saturday

      let isWeekend = false;
      if (excludeWeekends) {
        if (weekendType === 'sat-sun') {
          isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        } else if (weekendType === 'fri-sat') {
          isWeekend = (dayOfWeek === 5 || dayOfWeek === 6);
        }
      }

      if (isWeekend) {
        weekendDays++;
      } else {
        workingDays++;
      }

      // Increment day safely
      current.setDate(current.getDate() + 1);
    }

    return { total: totalDays, working: workingDays, weekends: weekendDays };
  };

  const results = calculateDays();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "تاريخ البدء" : "Start Date"}</label>
          <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "تاريخ الانتهاء" : "End Date"}</label>
          <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 bg-gray-900/40 p-4 rounded-xl border border-gray-800">
        <div className="flex items-center gap-2">
          <input 
            type="checkbox" 
            id="exclude" 
            checked={excludeWeekends} 
            onChange={e => setExcludeWeekends(e.target.checked)} 
            className="w-4.5 h-4.5 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-900"
          />
          <label htmlFor="exclude" className="text-sm text-gray-300 font-semibold cursor-pointer">
            {isAr ? "استبعاد عطلات نهاية الأسبوع" : "Exclude Weekends"}
          </label>
        </div>

        {excludeWeekends && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-500">{isAr ? "نظام نهاية الأسبوع" : "Weekend System"}</label>
            <select
              value={weekendType}
              onChange={e => setWeekendType(e.target.value as any)}
              className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-white text-xs"
            >
              <option value="sat-sun">{isAr ? "السبت والأحد" : "Saturday & Sunday"}</option>
              <option value="fri-sat">{isAr ? "الجمعة والسبت" : "Friday & Saturday"}</option>
            </select>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl text-center">
          <span className="block text-xs text-gray-500 mb-1">{isAr ? "إجمالي الأيام التقويمية" : "Total Calendar Days"}</span>
          <span className="text-2xl font-bold text-white">{results.total}</span>
        </div>
        <div className="bg-gray-900 border border-emerald-900 p-4 rounded-xl text-center">
          <span className="block text-xs text-emerald-500 mb-1">{isAr ? "أيام العمل الفعلية" : "Actual Working Days"}</span>
          <span className="text-2xl font-bold text-emerald-400">{results.working}</span>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-xl text-center">
          <span className="block text-xs text-gray-500 mb-1">{isAr ? "أيام عطلة نهاية الأسبوع" : "Weekend Days Excluded"}</span>
          <span className="text-2xl font-bold text-orange-400">{results.weekends}</span>
        </div>
      </div>
    </div>
  );
}

// 66. Countdown Timer
function CountdownTimer({ isAr }: { isAr: boolean }) {
  const [targetDate, setTargetDate] = useState('2027-01-01T00:00');
  const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const destination = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = destination - now;

      if (difference <= 0) {
        setTimeLeft({ d: 0, h: 0, m: 0, s: 0 });
        clearInterval(timer);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ d: days, h: hours, m: minutes, s: seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-1.5 text-start max-w-sm mx-auto">
        <label className="text-xs text-gray-400 font-bold">{isAr ? "تحديد هدف العد التنازلي" : "Set Target Date & Time"}</label>
        <input 
          type="datetime-local" 
          value={targetDate} 
          onChange={e => setTargetDate(e.target.value)} 
          className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" 
        />
      </div>

      {timeLeft ? (
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto pt-4">
          {[
            { label: isAr ? 'أيام' : 'Days', val: timeLeft.d },
            { label: isAr ? 'ساعات' : 'Hours', val: timeLeft.h },
            { label: isAr ? 'دقائق' : 'Mins', val: timeLeft.m },
            { label: isAr ? 'ثوانٍ' : 'Secs', val: timeLeft.s }
          ].map((item, i) => (
            <div key={i} className="bg-gray-950 border border-gray-800 p-4 rounded-2xl text-center shadow-lg">
              <span className="block text-3xl font-mono font-extrabold text-emerald-400 tabular-nums animate-pulse">{item.val}</span>
              <span className="text-xs text-gray-450 mt-1 block">{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6">
          {isAr ? "الرجاء تحديد تاريخ مستقبل للعد التنازلي" : "Please select a future target date."}
        </div>
      )}
    </div>
  );
}

// 67. Date Converter (Gregorian/Hijri)
function DateConverter({ isAr }: { isAr: boolean }) {
  const [gregDate, setGregDate] = useState('2026-07-14');
  const [hijriResult, setHijriResult] = useState('');

  useEffect(() => {
    if (!gregDate) return;
    try {
      const d = new Date(gregDate);
      const formatted = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(d);
      setHijriResult(formatted);
    } catch (e) {
      setHijriResult('');
    }
  }, [gregDate]);

  return (
    <div className="space-y-6">
      <div className="max-w-md mx-auto space-y-4 bg-gray-900/30 p-5 rounded-2xl border border-gray-800">
        <div className="space-y-1.5 text-start">
          <label className="text-sm text-gray-400 font-semibold">{isAr ? "التاريخ الميلادي" : "Gregorian Date"}</label>
          <input 
            type="date" 
            value={gregDate} 
            onChange={e => setGregDate(e.target.value)} 
            className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" 
          />
        </div>

        <div className="pt-4 border-t border-gray-800 space-y-1">
          <span className="text-xs text-gray-550 uppercase tracking-wider block font-semibold">
            {isAr ? "التاريخ الهجري المقابل" : "Converted Hijri Date"}
          </span>
          <div className="text-2xl font-bold text-emerald-400 py-2">
            {hijriResult || (isAr ? "الرجاء تحديد تاريخ صحيح" : "Please select a valid Gregorian date")}
          </div>
        </div>
      </div>
    </div>
  );
}

// 68. Time Duration Calculator
function TimeDurationCalculator({ isAr }: { isAr: boolean }) {
  const [time1, setTime1] = useState('09:00');
  const [time2, setTime2] = useState('17:30');

  const calculateDuration = () => {
    if (!time1 || !time2) return '';
    const [h1, m1] = time1.split(':').map(Number);
    const [h2, m2] = time2.split(':').map(Number);

    let diffMins = (h2 * 60 + m2) - (h1 * 60 + m1);
    if (diffMins < 0) {
      // Crossed midnight
      diffMins += 24 * 60;
    }

    const hours = Math.floor(diffMins / 60);
    const minutes = diffMins % 60;
    const decimalHours = (diffMins / 60).toFixed(2);

    return isAr 
      ? `${hours} ساعة و ${minutes} دقيقة (إجمالي ${decimalHours} ساعة عشرياً)` 
      : `${hours} hours and ${minutes} minutes (Total ${decimalHours} decimal hours)`;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "وقت البدء" : "Start Time"}</label>
          <input type="time" value={time1} onChange={e => setTime1(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "وقت الانتهاء" : "End Time"}</label>
          <input type="time" value={time2} onChange={e => setTime2(e.target.value)} className="w-full p-2.5 bg-gray-900 border border-gray-700 rounded text-white" />
        </div>
      </div>

      <div className="bg-gray-900/60 p-6 rounded-xl border border-gray-800 text-center space-y-1">
        <span className="text-xs uppercase text-gray-500 tracking-wider block font-semibold">{isAr ? "المدة المستغرقة" : "Calculated Duration"}</span>
        <div className="text-lg md:text-xl font-bold text-emerald-400">
          {calculateDuration()}
        </div>
      </div>
    </div>
  );
}

// 69. Weekly Schedule Planner
interface ScheduleItem {
  id: string;
  day: string;
  start: string;
  end: string;
  title: string;
  color: string;
}

function WeeklySchedulePlanner({ isAr }: { isAr: boolean }) {
  const [items, setItems] = useState<ScheduleItem[]>(() => {
    const saved = localStorage.getItem('omnitools_schedule');
    return saved ? JSON.parse(saved) : [];
  });

  const [title, setTitle] = useState('');
  const [day, setDay] = useState('Monday');
  const [start, setStart] = useState('09:00');
  const [end, setEnd] = useState('10:00');
  const [color, setColor] = useState('#6366F1');

  useEffect(() => {
    localStorage.setItem('omnitools_schedule', JSON.stringify(items));
  }, [items]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const newItem: ScheduleItem = {
      id: Math.random().toString(36).substring(2, 9),
      day, start, end, title, color
    };
    setItems(prev => [...prev, newItem]);
    setTitle('');
  };

  const handleDelete = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const daysList = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-3 bg-gray-900/40 p-4 rounded-xl border border-gray-800 items-end">
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "العنوان" : "Title"}</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder={isAr ? "مثال: مراجعة الكود" : "Code review"} className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "اليوم" : "Day"}</label>
          <select value={day} onChange={e => setDay(e.target.value)} className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm">
            {daysList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "البدء" : "Start"}</label>
          <input type="time" value={start} onChange={e => setStart(e.target.value)} className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "الانتهاء" : "End"}</label>
          <input type="time" value={end} onChange={e => setEnd(e.target.value)} className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm" />
        </div>
        <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-1.5">
          <Plus size={16} />
          <span>{isAr ? "إضافة حصة" : "Add Slot"}</span>
        </button>
      </form>

      {items.length > 0 ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">{isAr ? "جدولك الأسبوعي الحالي" : "Your Weekly Schedule"}</h4>
            <button onClick={() => setItems([])} className="text-xs text-orange-400 hover:text-orange-300 font-bold flex items-center gap-1 cursor-pointer">
              <Trash2 size={12} />
              <span>{isAr ? "مسح الكل" : "Clear All"}</span>
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => (
              <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-start" style={{ borderLeft: `4px solid ${item.color}` }}>
                <div>
                  <h5 className="font-bold text-gray-200">{item.title}</h5>
                  <span className="text-xs text-indigo-400 font-semibold uppercase block mt-1">{item.day}</span>
                  <span className="text-xs text-gray-500 font-mono mt-0.5 block">{item.start} - {item.end}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-gray-500 hover:text-red-400 p-1 rounded hover:bg-gray-800 transition-colors cursor-pointer">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6 border border-dashed border-gray-800 rounded-xl">
          {isAr ? "لم يتم التخطيط لأي حصص عمل أو دراسة بعد." : "No slots added to your weekly planner yet."}
        </div>
      )}
    </div>
  );
}

// 70. Todo List Tool
interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

function TodoListTool({ isAr }: { isAr: boolean }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('omnitools_todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [inputText, setInputText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('Personal');

  useEffect(() => {
    localStorage.setItem('omnitools_todos', JSON.stringify(todos));
  }, [todos]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTodo: Todo = {
      id: Math.random().toString(36).substring(2, 9),
      text: inputText.trim(),
      completed: false,
      priority,
      category
    };
    setTodos(prev => [...prev, newTodo]);
    setInputText('');
  };

  const toggleTodo = (id: string) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  const getPriorityColor = (p: string) => {
    if (p === 'high') return 'bg-red-950 text-red-400 border border-red-900';
    if (p === 'medium') return 'bg-orange-950 text-orange-400 border border-orange-900';
    return 'bg-emerald-950 text-emerald-400 border border-emerald-900';
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-gray-900/40 p-4 rounded-xl border border-gray-800 items-end">
        <div className="sm:col-span-2 space-y-1 text-start">
          <label className="text-xs text-gray-400 font-bold">{isAr ? "إضافة مهمة جديدة" : "New Task Text"}</label>
          <input 
            type="text" 
            value={inputText} 
            onChange={e => setInputText(e.target.value)} 
            placeholder={isAr ? "ما العمل المطلوب إنجازه؟" : "What needs to be done?"} 
            className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm focus:outline-none" 
          />
        </div>
        <div className="space-y-1 text-start">
          <label className="text-xs text-gray-400">{isAr ? "الأولوية" : "Priority"}</label>
          <select value={priority} onChange={e => setPriority(e.target.value as any)} className="w-full px-3 py-1.5 bg-gray-900 border border-gray-700 rounded text-white text-sm">
            <option value="low">{isAr ? "منخفضة" : "Low"}</option>
            <option value="medium">{isAr ? "متوسطة" : "Medium"}</option>
            <option value="high">{isAr ? "مرتفعة" : "High"}</option>
          </select>
        </div>
        <button type="submit" className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-sm transition-all flex items-center justify-center gap-1.5">
          <Plus size={16} />
          <span>{isAr ? "إضافة" : "Add Task"}</span>
        </button>
      </form>

      {todos.length > 0 ? (
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider">{isAr ? "قائمة المهام الحالية" : "Active Checklists"}</h4>
            <button onClick={() => setTodos([])} className="text-xs text-red-400 hover:text-red-300 font-bold flex items-center gap-1 cursor-pointer">
              <Trash2 size={12} />
              <span>{isAr ? "حذف الجميع" : "Clear Completed"}</span>
            </button>
          </div>
          <div className="space-y-2">
            {todos.map(todo => (
              <div key={todo.id} className="flex items-center justify-between bg-gray-900/60 p-3 rounded-xl border border-gray-800/80 hover:bg-gray-900 transition-colors">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => toggleTodo(todo.id)} 
                    className={`w-6 h-6 rounded-md flex items-center justify-center border transition-all ${todo.completed ? 'bg-emerald-600 border-emerald-500 text-white' : 'border-gray-700 hover:border-indigo-500'}`}
                  >
                    {todo.completed && <Check size={14} />}
                  </button>
                  <span className={`text-sm ${todo.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                    {todo.text}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded ${getPriorityColor(todo.priority)}`}>
                    {todo.priority}
                  </span>
                  <button onClick={() => deleteTodo(todo.id)} className="text-gray-500 hover:text-red-400 p-1 hover:bg-gray-800 rounded transition-colors cursor-pointer">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 py-6 border border-dashed border-gray-800 rounded-xl">
          {isAr ? "كل شيء منجز! لا مهام في قائمة الانتظار." : "Excellent! All tasks are completed."}
        </div>
      )}
    </div>
  );
}
