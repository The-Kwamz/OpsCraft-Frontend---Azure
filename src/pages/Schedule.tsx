import { useMemo, useState } from "react";

type AppointmentStatus = "scheduled" | "in_progress" | "completed";

type Appointment = {
  id: string;
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
    title: "Maintenance Review",
    technician: "BN 2-14",
    customer: "Makhoba Projects",
    date: "2026-04-09",
    startHour: 11,
    endHour: 13,
    status: "scheduled",
    color: "#0ea5e9",
  },
];

const weekDays = [
  { label: "Mon", day: "06", date: "2026-04-06" },
  { label: "Tue", day: "07", date: "2026-04-07" },
  { label: "Wed", day: "08", date: "2026-04-08" },
  { label: "Thu", day: "09", date: "2026-04-09" },
  { label: "Fri", day: "10", date: "2026-04-10" },
];

const timeSlots = [11, 12, 13, 14, 15, 16];

function formatHour(hour: number) {
  return `${hour}:00`;
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
  const selectedDate = "2026-04-07";
  const [selectedTech, setSelectedTech] = useState("BN 2-14");

  const filteredAppointments = useMemo(() => {
    return appointments.filter((item) => item.technician === selectedTech);
  }, [selectedTech]);

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
              <span>2026 April</span>
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
              {["29", "30", "31", "1", "2", "3", "4"].map((item) => (
                <div key={item} style={{ padding: "8px 0", color: "#374151" }}>
                  {item}
                </div>
              ))}
              {["5", "6", "7", "8", "9", "10", "11"].map((item) => {
                const isSelected = item === "7";
                return (
                  <div
                    key={item}
                    style={{
                      padding: "8px 0",
                      borderRadius: 999,
                      background: isSelected ? "#5b5bd6" : "transparent",
                      color: isSelected ? "#fff" : "#374151",
                      fontWeight: isSelected ? 700 : 500,
                    }}
                  >
                    {item}
                  </div>
                );
              })}
              {["12", "13", "14", "15", "16", "17", "18"].map((item) => (
                <div key={item} style={{ padding: "8px 0", color: "#374151" }}>
                  {item}
                </div>
              ))}
              {["19", "20", "21", "22", "23", "24", "25"].map((item) => (
                <div key={item} style={{ padding: "8px 0", color: "#374151" }}>
                  {item}
                </div>
              ))}
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

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 15,
                  color: "#374151",
                  marginBottom: 16,
                }}
              >
                <input type="checkbox" checked readOnly />
                <span>{selectedTech}</span>
              </label>

              <button
                type="button"
                style={{
                  border: "none",
                  background: "transparent",
                  color: "#4f46e5",
                  fontWeight: 600,
                  cursor: "pointer",
                  padding: 0,
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
                  2026, April 06–10
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
                  <option value="BN 2-14">BN 2-14</option>
                </select>

                <button
                  type="button"
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
                  key={day.date}
                  style={{
                    position: "relative",
                    borderRight: "1px solid #e5e7eb",
                  }}
                >
                  <div
                    style={{
                      height: 80,
                      borderBottom: "1px solid #e5e7eb",
                      padding: "14px 16px",
                      background: selectedDate === day.date ? "#f5f3ff" : "#fff",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: selectedDate === day.date ? "#4f46e5" : "#4b5563",
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
                  </div>

                  {timeSlots.map((hour) => (
                    <div
                      key={`${day.date}-${hour}`}
                      style={{
                        height: 95,
                        borderBottom: "1px solid #edf0f3",
                        background:
                          selectedDate === day.date ? "rgba(91,91,214,0.04)" : "#fff",
                      }}
                    />
                  ))}

                  {filteredAppointments
                    .filter((item) => item.date === day.date)
                    .map((item) => {
                      const top = 80 + (item.startHour - timeSlots[0]) * 95;
                      const height = (item.endHour - item.startHour) * 95 - 6;

                      return (
                        <div
                          key={item.id}
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
                        </div>
                      );
                    })}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}