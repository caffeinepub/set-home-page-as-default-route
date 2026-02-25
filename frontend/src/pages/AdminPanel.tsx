import { useState } from 'react';
import { useGetVisitorLog, useClearVisitorLog, useGetNotifications } from '@/hooks/useQueries';
import { Shield, Eye, EyeOff, Trash2, Bell, Loader2, Lock, RefreshCw, User } from 'lucide-react';
import type { VisitorEntry } from '@/backend';

function formatTimestamp(ts: bigint): string {
  try {
    const ms = Number(ts) / 1_000_000;
    return new Date(ms).toLocaleString();
  } catch {
    return 'Invalid date';
  }
}

export default function AdminPanel() {
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [submittedPassword, setSubmittedPassword] = useState('');

  const visitorLog = useGetVisitorLog(submittedPassword, authenticated);
  const clearLog = useClearVisitorLog();
  const notifications = useGetNotifications();

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPassword.trim() === 'CUTOUT') {
      setSubmittedPassword(inputPassword.trim());
      setAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Incorrect password. Access denied.');
      setAuthenticated(false);
    }
  };

  const handleClear = async () => {
    if (!authenticated) return;
    await clearLog.mutateAsync('CUTOUT');
    visitorLog.refetch();
  };

  const handleRefresh = () => {
    visitorLog.refetch();
  };

  // Safely derive entries array
  // visitorLog.data === null  → backend returned null (wrong password or no data)
  // visitorLog.data === undefined → query hasn't run yet
  // visitorLog.data === [] → empty array, no visitors yet
  // visitorLog.data === [...] → entries to display
  const rawData = visitorLog.data;
  const entries: VisitorEntry[] = Array.isArray(rawData) ? rawData : [];
  const hasData = Array.isArray(rawData);
  const recentNotifications: VisitorEntry[] = (notifications.data ?? []).slice(-10).reverse();

  return (
    <div
      className="relative min-h-screen py-12 px-4 grid-bg"
      style={{ backgroundColor: 'transparent' }}
    >
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{
              background: 'rgba(255, 68, 68, 0.1)',
              border: '1px solid rgba(255, 68, 68, 0.4)',
              boxShadow: '0 0 30px rgba(255, 68, 68, 0.15)',
            }}
          >
            <Shield className="w-8 h-8" style={{ color: '#ff4444' }} />
          </div>
          <h1
            className="text-3xl md:text-4xl font-orbitron font-bold mb-2"
            style={{
              color: '#ff4444',
              textShadow: '0 0 20px rgba(255, 68, 68, 0.5)',
            }}
          >
            ADMIN PANEL
          </h1>
          <p
            className="text-sm font-rajdhani tracking-widest"
            style={{ color: 'rgba(150, 180, 220, 0.5)' }}
          >
            HOST ACCESS ONLY
          </p>
          <div
            className="w-24 h-0.5 mx-auto mt-4"
            style={{ background: 'linear-gradient(90deg, transparent, #ff4444, transparent)' }}
          />
        </div>

        {/* Password Gate */}
        {!authenticated ? (
          <div className="max-w-md mx-auto animate-fade-in-up">
            <div
              className="glass-card-red p-8"
              style={{
                boxShadow: '0 8px 40px rgba(0,0,0,0.6), 0 0 40px rgba(255,68,68,0.05)',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock className="w-5 h-5" style={{ color: '#ff4444' }} />
                <h2
                  className="font-orbitron font-bold text-base"
                  style={{ color: '#ff4444' }}
                >
                  AUTHENTICATION REQUIRED
                </h2>
              </div>

              <form onSubmit={handleAuth} className="space-y-5">
                <div>
                  <label
                    htmlFor="admin-password"
                    className="block text-xs font-rajdhani font-semibold tracking-widest mb-2"
                    style={{ color: 'rgba(255, 68, 68, 0.7)' }}
                  >
                    ACCESS PASSWORD
                  </label>
                  <div className="relative">
                    <input
                      id="admin-password"
                      type={showPassword ? 'text' : 'password'}
                      value={inputPassword}
                      onChange={(e) => {
                        setInputPassword(e.target.value);
                        if (authError) setAuthError('');
                      }}
                      placeholder="Enter admin password..."
                      className="w-full px-4 py-3 pr-12 rounded-xl text-sm font-inter outline-none transition-all duration-300"
                      style={{
                        background: 'rgba(255, 68, 68, 0.05)',
                        border: authError
                          ? '1px solid rgba(255, 68, 68, 0.7)'
                          : '1px solid rgba(255, 68, 68, 0.3)',
                        color: '#e0f0ff',
                        boxShadow: authError
                          ? '0 0 10px rgba(255, 68, 68, 0.2)'
                          : '0 0 10px rgba(255, 68, 68, 0.05)',
                      }}
                      autoComplete="off"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      style={{ color: 'rgba(255, 68, 68, 0.5)' }}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {authError && (
                    <p
                      className="mt-2 text-xs font-rajdhani"
                      style={{ color: '#ff4444' }}
                    >
                      {authError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl font-orbitron font-bold text-sm tracking-widest flex items-center justify-center gap-2 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.2), rgba(255, 68, 68, 0.08))',
                    border: '1px solid rgba(255, 68, 68, 0.5)',
                    color: '#ff4444',
                    boxShadow: '0 0 20px rgba(255, 68, 68, 0.15)',
                    cursor: 'pointer',
                  }}
                >
                  <Shield className="w-4 h-4" />
                  AUTHENTICATE
                </button>
              </form>

              <div
                className="mt-6 pt-4 text-center text-xs font-rajdhani tracking-wider"
                style={{
                  borderTop: '1px solid rgba(255, 68, 68, 0.1)',
                  color: 'rgba(150, 180, 210, 0.35)',
                }}
              >
                UNAUTHORIZED ACCESS IS PROHIBITED
              </div>
            </div>
          </div>
        ) : (
          /* Authenticated View */
          <div className="space-y-8 animate-fade-in-up">

            {/* Visitor Log */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255, 68, 68, 0.04)',
                border: '1px solid rgba(255, 68, 68, 0.2)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
              }}
            >
              {/* Section header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(255, 68, 68, 0.1)',
                      border: '1px solid rgba(255, 68, 68, 0.35)',
                    }}
                  >
                    <Shield className="w-4 h-4" style={{ color: '#ff4444' }} />
                  </div>
                  <h2
                    className="font-orbitron font-bold text-sm tracking-wider"
                    style={{ color: '#ff4444' }}
                  >
                    VISITOR LOG
                  </h2>
                  {hasData && (
                    <span
                      className="px-2 py-0.5 rounded-full text-xs font-rajdhani font-semibold"
                      style={{
                        background: 'rgba(255, 68, 68, 0.1)',
                        border: '1px solid rgba(255, 68, 68, 0.25)',
                        color: '#ff4444',
                      }}
                    >
                      {entries.length} {entries.length === 1 ? 'entry' : 'entries'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRefresh}
                    disabled={visitorLog.isFetching}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-rajdhani font-semibold tracking-wider transition-all duration-300"
                    style={{
                      background: 'rgba(255, 68, 68, 0.05)',
                      border: '1px solid rgba(255, 68, 68, 0.2)',
                      color: 'rgba(255,68,68,0.7)',
                      cursor: visitorLog.isFetching ? 'not-allowed' : 'pointer',
                      opacity: visitorLog.isFetching ? 0.5 : 1,
                    }}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${visitorLog.isFetching ? 'animate-spin' : ''}`} />
                    REFRESH
                  </button>

                  <button
                    onClick={handleClear}
                    disabled={clearLog.isPending || entries.length === 0}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-rajdhani font-semibold tracking-wider transition-all duration-300"
                    style={{
                      background: 'rgba(255, 68, 68, 0.08)',
                      border: '1px solid rgba(255, 68, 68, 0.3)',
                      color: entries.length === 0 ? 'rgba(255,68,68,0.3)' : '#ff4444',
                      cursor: (clearLog.isPending || entries.length === 0) ? 'not-allowed' : 'pointer',
                      opacity: clearLog.isPending ? 0.6 : 1,
                    }}
                  >
                    {clearLog.isPending ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="w-3.5 h-3.5" />
                    )}
                    CLEAR ALL
                  </button>
                </div>
              </div>

              {/* Log content */}
              {visitorLog.isFetching ? (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#ff4444' }} />
                  <span className="text-xs font-rajdhani tracking-widest" style={{ color: 'rgba(255,68,68,0.5)' }}>
                    LOADING VISITOR DATA...
                  </span>
                </div>
              ) : visitorLog.isError ? (
                <div className="text-center py-16">
                  <p className="text-sm font-rajdhani tracking-wider mb-3" style={{ color: 'rgba(255, 68, 68, 0.6)' }}>
                    FAILED TO LOAD LOG
                  </p>
                  <button
                    onClick={handleRefresh}
                    className="text-xs font-rajdhani tracking-widest px-4 py-2 rounded-xl"
                    style={{
                      background: 'rgba(255,68,68,0.08)',
                      border: '1px solid rgba(255,68,68,0.3)',
                      color: '#ff4444',
                      cursor: 'pointer',
                    }}
                  >
                    RETRY
                  </button>
                </div>
              ) : !hasData ? (
                /* Query hasn't returned data yet — show loading hint */
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <Loader2 className="w-7 h-7 animate-spin" style={{ color: '#ff4444' }} />
                  <span className="text-xs font-rajdhani tracking-widest" style={{ color: 'rgba(255,68,68,0.5)' }}>
                    CONNECTING TO DATABASE...
                  </span>
                </div>
              ) : entries.length === 0 ? (
                <div className="text-center py-16">
                  <User className="w-10 h-10 mx-auto mb-3" style={{ color: 'rgba(255,68,68,0.2)' }} />
                  <p className="text-sm font-rajdhani tracking-wider" style={{ color: 'rgba(150, 180, 220, 0.35)' }}>
                    NO VISITOR RECORDS FOUND
                  </p>
                  <p className="text-xs font-rajdhani mt-2" style={{ color: 'rgba(150, 180, 220, 0.25)' }}>
                    Visitors will appear here after they log in
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {[...entries].reverse().map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200"
                      style={{
                        background: 'rgba(255, 68, 68, 0.03)',
                        border: '1px solid rgba(255, 68, 68, 0.1)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,68,68,0.07)';
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,68,68,0.2)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255, 68, 68, 0.03)';
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255, 68, 68, 0.1)';
                      }}
                    >
                      {/* Index badge */}
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-orbitron font-bold flex-shrink-0"
                        style={{
                          background: 'rgba(255,68,68,0.1)',
                          color: 'rgba(255,68,68,0.6)',
                        }}
                      >
                        {entries.length - i}
                      </span>

                      {/* User icon */}
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'rgba(255,68,68,0.08)',
                          border: '1px solid rgba(255,68,68,0.2)',
                        }}
                      >
                        <User className="w-4 h-4" style={{ color: 'rgba(255,68,68,0.6)' }} />
                      </div>

                      {/* Visitor name — prominently displayed */}
                      <span
                        className="flex-1 font-inter font-semibold text-base"
                        style={{ color: '#e0f0ff' }}
                      >
                        {entry.username}
                      </span>

                      {/* Timestamp */}
                      <span
                        className="text-xs font-inter flex-shrink-0"
                        style={{ color: 'rgba(150, 180, 220, 0.5)' }}
                      >
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Activity / Notifications */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(0, 245, 255, 0.03)',
                border: '1px solid rgba(0, 245, 255, 0.15)',
                boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
              }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'rgba(0, 245, 255, 0.1)',
                      border: '1px solid rgba(0, 245, 255, 0.35)',
                    }}
                  >
                    <Bell className="w-4 h-4" style={{ color: '#00f5ff' }} />
                  </div>
                  <h2
                    className="font-orbitron font-bold text-sm tracking-wider"
                    style={{ color: '#00f5ff' }}
                  >
                    RECENT ACTIVITY
                  </h2>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-rajdhani font-semibold"
                    style={{
                      background: 'rgba(0, 245, 255, 0.08)',
                      border: '1px solid rgba(0, 245, 255, 0.2)',
                      color: 'rgba(0, 245, 255, 0.7)',
                    }}
                  >
                    LIVE · 30s
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {notifications.isFetching && (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ color: 'rgba(0,245,255,0.5)' }} />
                  )}
                  <span
                    className="text-xs font-rajdhani tracking-wider"
                    style={{ color: 'rgba(0, 245, 255, 0.4)' }}
                  >
                    AUTO-REFRESH
                  </span>
                </div>
              </div>

              {notifications.isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#00f5ff' }} />
                </div>
              ) : recentNotifications.length === 0 ? (
                <div
                  className="text-center py-8 text-sm font-rajdhani tracking-wider"
                  style={{ color: 'rgba(150, 180, 220, 0.35)' }}
                >
                  NO RECENT ACTIVITY
                </div>
              ) : (
                <div className="space-y-2">
                  {recentNotifications.map((entry, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{
                        background: 'rgba(0, 245, 255, 0.03)',
                        border: '1px solid rgba(0, 245, 255, 0.08)',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: '#00f5ff', boxShadow: '0 0 6px #00f5ff' }}
                        />
                        <span className="font-inter text-sm font-medium" style={{ color: '#e0f0ff' }}>
                          {entry.username}
                        </span>
                      </div>
                      <span className="text-xs font-inter" style={{ color: 'rgba(150, 180, 220, 0.45)' }}>
                        {formatTimestamp(entry.timestamp)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
