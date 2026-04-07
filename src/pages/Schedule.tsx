import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

type AppointmentStatus = "scheduled" | "in_progress" | "completed";

type Appointment = {
  id: string;
  jobId: string;
  title: string;
  technician: string;
  customer: string;
  date: string;
  startHour: number;
  endHour: number;
  status: AppointmentStatus;
  color: string;
};

const appointments: Appointment[] = [
  {
    id: "1",
    jobId: "1",
    title: "Electrical Inspection",
    technician: "BN 2-14",
    customer: "Vodacom",
    date: "2026-04-07",
    startHour: 12,
    endHour: 13,
    status: "scheduled",
    color: "#5b5bd6",
  },
  {
    id: "2",
    jobId: "2",
    title: "Installation Visit",
    technician: "BN 2-14",
    customer: "Kwame Test",
    date: "2026-04-08",
    startHour: 12,
    endHour: 14,
    status: "in_progress",
    color: "#7c3aed",
  },
  {
    id: "3",
    jobId: "3",
    title: "Maintenance Review",
    technician: "BN 2-14",
    customer: "Makhoba Projects",
    date: "2026-04-09",
    startHour: 11,
    endHour: 13,
    status: "scheduled",
    color: "#0ea5e9",
  },
  {
    id: "4",
    jobId: "4",
    title: "Site Call Out",
    technician: "Team Alpha",
    customer: "Blue Rock Estates",
    date: "2026-04-10",
    startHour: 10,
    endHour: 12,
    status: "completed",
    color: "#16a34a",
  },
];

const timeSlots = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
const TECH_OPTIONS = ["BN 2-14", "Team Alpha", "All Technicians"];

function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

function formatDayLabel(date: Date) {
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

function formatDayNumber(date: Date) {
  return date.toLocaleDateString("en-US", { day: "2-digit" });
}

function formatMonthLabel(date: Date) {
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long" });
}

function formatHeaderDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
}

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

function startOfWorkWeek(date: Date) {
  const copy = new Date(date);
  const day = copy.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  copy.setDate(copy.getDate() + diff);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function buildWorkWeek(selectedDate: Date) {
  const startDate = startOfWorkWeek(selectedDate);

  return Array.from({ length: 5 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    return {
      date,
      key: toDateKey(date),
      label: formatDayLabel(date),
      day: formatDayNumber(date),
    };
  });
}

function buildMiniCalendarDays() {
  return [
    "29", "30", "31", "1", "2", "3", "4",
    "5", "6", "7", "8", "9", "10", "11",
    "12", "13", "14", "15", "16", "17", "18",
    "19", "20", "21", "22", "23", "24", "25",
    "26", "27", "28", "29", "30", "1", "2",
  ];
}

function getStatusLabel(status: AppointmentStatus) {
  switch (status) {
    case "scheduled":
      return "Scheduled";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    default:
      return status;
  }
}

export default function Schedule() {
  const navigate = useNavigate();

  const today = new Date("2026-04-07T09:00:00");
  const [selectedDate, setSelectedDate] = useState("2026-04-07");
  const [selectedTech, setSelectedTech] = useState("BN 2-14");

  const selectedDateObject = useMemo(() => {
    return new Date(`${selectedDate}T09:00:00`);
  }, [selectedDate]);

  const weekDays = useMemo(() => {
    return buildWorkWeek(selectedDateObject);
  }, [selectedDateObject]);

  const filteredAppointments = useMemo(() => {
    if (selectedTech === "All Technicians") {
      return appointments;
    }

    return appointments.filter((item) => item.technician === selectedTech);
  }, [selectedTech]);

  const selectedDayAppointments = useMemo(() => {
    return filteredAppointments.filter((item) => item.date === selectedDate);
  }, [filteredAppointments, selectedDate]);

  function goToToday() {
    setSelectedDate(toDateKey(today));
  }

  function goToPreviousDay() {
    const previous = new Date(selectedDateObject);
    previous.setDate(previous.getDate() - 1);
    setSelectedDate(toDateKey(previous));
  }

  function goToNextDay() {
    const next = new Date(selectedDateObject);
    next.setDate(next.getDate() + 1);
    setSelectedDate(toDateKey(next));
  }

  function handleMiniCalendarSelect(day: string) {
    const numericDay = Number(day);

    if (numericDay >= 1 && numericDay <= 30) {
      const selected = new Date(2026, 3, numericDay);
      setSelectedDate(toDateKey(selected));
    }
  }

  function openCreateJob(date: string, hour?: number) {
    const params = new URLSearchParams();
    params.set("date", date);

    if (typeof hour === "number") {
      params.set("time", formatHour(hour));
    }

    navigate(`/jobs/new?${params.toString()}`);
  }

  function openJob(jobId: string) {
    navigate(`/jobs/${jobId}`);
  }

  return (
    <div className="jobs-page">
      <div
        className="jobs-table-card"
        style={{
          padding: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "300px 1fr",
            minHeight: "760px",
          }}
        >
          <aside
            style={{
              borderRight: "1px solid #e5e7eb",
              background: "#fafafa",
              padding: "22px 20px",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 28,
                fontSize: 22,
                fontWeight: 800,
                color: "#1f2937",
              }}
            >
              Calendar
            </h2>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
                fontWeight: 700,
                color: "#374151",
              }}
            >
              <span>{formatMonthLabel(selectedDateObject)}</span>
              <span style={{ color: "#6b7280" }}>↑ ↓</span>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
                textAlign: "center",
                marginBottom: 10,
                fontSize: 13,
                color: "#4b5563",
              }}
            >
              {["S", "M", "T", "W", "T", "F", "S"].map((item) => (
                <div key={item}>{item}</div>
              ))}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, 1fr)",
                gap: 6,
                textAlign: "center",
                marginBottom: 28,
              }}
            >
              {buildMiniCalendarDays().map((item) => {
                const isSelected = Number(item) === selectedDateObject.getDate();

                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleMiniCalendarSelect(item)}
                    style={{
                      padding: "8px 0",
                      borderRadius: 999,
                      border: "none",
                      background: isSelected ? "#5b5bd6" : "transparent",
                      color: isSelected ? "#fff" : "#374151",
                      fontWeight: isSelected ? 700 : 500,
                      cursor: "pointer",
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                borderTop: "1px solid #d1d5db",
                paddingTop: 18,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#374151",
                  marginBottom: 14,
                }}
              >
                My calendars
              </div>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 15,
                  color: "#374151",
                }}
              >
                <input type="checkbox" checked readOnly />
                <span>Calendar</span>
              </label>
            </div>

            <div
              style={{
                borderTop: "1px solid #d1d5db",
                paddingTop: 18,
              }}
            >
              <div
                style={{
                  fontWeight: 700,
                  fontSize: 16,
                  color: "#374151",
                  marginBottom: 14,
                }}
              >
                Other calendars
              </div>

              {TECH_OPTIONS.filter((tech) => tech !== "All Technicians").map((tech) => (
                <label
                  key={tech}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 15,
                    color: "#374151",
                    marginBottom: 12,
                  }}
                >
                  <input
                    type="radio"
                    name="tech-calendar"
                    checked={selectedTech === tech}
                    onChange={() => setSelectedTech(tech)}
                  />
                  <span>{tech}</span>
                </label>
              ))}

              <button
                type="button"
                onClick={() => setSelectedTech("All Technicians")}
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#4f46e5",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
                  marginTop: 8,
                }}
              >
                Show all
              </button>
            </div>
          </aside>

          <section
            style={{
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "18px 22px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <button
                  type="button"
                  onClick={goToToday}
                  style={{
                    border: "1px solid #d1d5db",
                    background: "#fff",
                    borderRadius: 10,
                    padding: "8px 12px",
                    cursor: "pointer",
                  }}
                >
                  Today
                </button>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    type="button"
                    onClick={goToPreviousDay}
                    style={{
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      borderRadius: 10,
                      padding: "8px 10px",
                      cursor: "pointer",
                    }}
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    onClick={goToNextDay}
                    style={{
                      border: "1px solid #d1d5db",
                      background: "#fff",
                      borderRadius: 10,
                      padding: "8px 10px",
                      cursor: "pointer",
                    }}
                  >
                    ›
                  </button>
                </div>

                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1f2937",
                  }}
                >
                  {formatHeaderDate(selectedDateObject)}
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <select
                  value={selectedTech}
                  onChange={(e) => setSelectedTech(e.target.value)}
                  style={{
                    border: "1px solid #d1d5db",
                    borderRadius: 10,
                    padding: "8px 12px",
                    background: "#fff",
                  }}
                >
                  {TECH_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => openCreateJob(selectedDate)}
                  style={{
                    background: "#4f46e5",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "10px 18px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  New
                </button>
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "70px repeat(5, 1fr)",
                minHeight: "690px",
              }}
            >
              <div style={{ borderRight: "1px solid #e5e7eb" }}>
                <div
                  style={{
                    height: 80,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                />
                {timeSlots.map((hour) => (
                  <div
                    key={hour}
                    style={{
                      height: 95,
                      borderBottom: "1px solid #edf0f3",
                      paddingTop: 8,
                      textAlign: "center",
                      color: "#6b7280",
                      fontSize: 14,
                    }}
                  >
                    {formatHour(hour)}
                  </div>
                ))}
              </div>

              {weekDays.map((day) => (
                <div
                  key={day.key}
                  style={{
                    position: "relative",
                    borderRight: "1px solid #e5e7eb",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedDate(day.key)}
                    style={{
                      width: "100%",
                      height: 80,
                      border: "none",
                      borderBottom: "1px solid #e5e7eb",
                      padding: "14px 16px",
                      background: selectedDate === day.key ? "#f5f3ff" : "#fff",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: selectedDate === day.key ? "#4f46e5" : "#4b5563",
                      }}
                    >
                      {day.day}
                    </div>
                    <div
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#4f46e5",
                        lineHeight: 1.1,
                      }}
                    >
                      {day.label}
                    </div>
                  </button>

                  {timeSlots.map((hour) => (
                    <button
                      key={`${day.key}-${hour}`}
                      type="button"
                      onClick={() => openCreateJob(day.key, hour)}
                      style={{
                        width: "100%",
                        height: 95,
                        border: "none",
                        borderBottom: "1px solid #edf0f3",
                        background: selectedDate === day.key ? "rgba(91,91,214,0.04)" : "#fff",
                        cursor: "pointer",
                      }}
                      aria-label={`Book job on ${day.key} at ${formatHour(hour)}`}
                    />
                  ))}

                  {filteredAppointments
                    .filter((item) => item.date === day.key)
                    .map((item) => {
                      const top = 80 + (item.startHour - timeSlots[0]) * 95;
                      const height = (item.endHour - item.startHour) * 95 - 6;

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => openJob(item.jobId)}
                          style={{
                            position: "absolute",
                            left: 8,
                            right: 8,
                            top,
                            height,
                            background: item.color,
                            color: "#fff",
                            borderRadius: 12,
                            padding: "10px 12px",
                            boxShadow: "0 10px 18px rgba(79,70,229,0.15)",
                            overflow: "hidden",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 14,
                              fontWeight: 700,
                              marginBottom: 4,
                            }}
                          >
                            {item.title}
                          </div>
                          <div style={{ fontSize: 12, opacity: 0.95 }}>{item.customer}</div>
                          <div style={{ fontSize: 12, opacity: 0.95, marginTop: 4 }}>
                            {formatHour(item.startHour)} - {formatHour(item.endHour)}
                          </div>
                          <div style={{ fontSize: 12, opacity: 0.95, marginTop: 4 }}>
                            {getStatusLabel(item.status)}
                          </div>
                        </button>
                      );
                    })}
                </div>
              ))}
            </div>

            <div
              style={{
                borderTop: "1px solid #e5e7eb",
                padding: "16px 22px",
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#111827",
                  marginBottom: 10,
                }}
              >
                Selected Day Summary
              </div>

              {selectedDayAppointments.length === 0 ? (
                <div style={{ color: "#6b7280", fontSize: 14 }}>
                  No appointments for this day.
                </div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {selectedDayAppointments.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "12px 14px",
                        background: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: 12,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 700, color: "#111827" }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
                          {item.customer} · {formatHour(item.startHour)} - {formatHour(item.endHour)}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => openJob(item.jobId)}
                        style={{
                          border: "1px solid #d1d5db",
                          background: "#fff",
                          borderRadius: 10,
                          padding: "8px 12px",
                          cursor: "pointer",
                          fontWeight: 600,
                        }}
                      >
                        View Job
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}