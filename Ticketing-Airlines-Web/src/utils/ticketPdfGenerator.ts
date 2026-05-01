import { jsPDF } from 'jspdf'
import QRCode from 'qrcode'
import type { BookingPassenger } from '@/types/booking'
import type {
  FlightSearchResult,
  RoundTripResult,
  MultiCityResult
} from '@/interfaces/interfaces'

interface TicketData {
  pnr: string
  bookingDate: string
  passengers: BookingPassenger[]
  flight: FlightSearchResult | RoundTripResult | MultiCityResult
  contactEmail: string
  contactPhone: string
  totalPrice: number
  baseFare: number
  taxes: number
  fees: number
  bundleName?: string
}

export async function generateETicketPDF(data: TicketData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20

  // Helper function to get flight property
  const getFlightProperty = (property: string): string => {
    const flight = data.flight as unknown as Record<string, unknown>
    
    if ('price' in data.flight) {
      return String((flight as Record<string, unknown>)[property] || '')
    } else if ('outbound' in data.flight) {
      const outbound = (flight.outbound as Record<string, unknown>)
      return String(outbound[property] || '')
    } else if ('segments' in data.flight) {
      const segments = flight.segments as Array<Record<string, unknown>>
      return String(segments[0]?.[property] || '')
    }
    return ''
  }

  const getAirportProperty = (airportKey: string, property: string): string => {
    const flight = data.flight as unknown as Record<string, unknown>
    let airport: Record<string, unknown> | undefined

    if ('price' in data.flight) {
      airport = (flight as Record<string, unknown>)[airportKey] as Record<string, unknown>
    } else if ('outbound' in data.flight) {
      const outbound = flight.outbound as Record<string, unknown>
      airport = outbound[airportKey] as Record<string, unknown>
    } else if ('segments' in data.flight) {
      const segments = flight.segments as Array<Record<string, unknown>>
      airport = segments[0]?.[airportKey] as Record<string, unknown>
    }

    return String(airport?.[property] || '')
  }

  // Colors
  const primaryBlue = [30, 64, 175] // #1e40af
  const darkGray = [31, 41, 55] // #1f2937
  const lightGray = [243, 244, 246] // #f3f4f6
  const borderGray = [209, 213, 219] // #d1d5db

  let yPos = 0

  // ===== HEADER SECTION =====
  // Blue header bar
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.rect(0, 0, pageWidth, 40, 'F')
  
  // Airline name
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(28)
  doc.setFont('helvetica', 'bold')
  doc.text('SKYWAYS', margin, 18)
  
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('AIRLINES', margin, 26)

  // E-Ticket label
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('ELECTRONIC TICKET', pageWidth - margin, 22, { align: 'right' })

  yPos = 50

  // ===== PNR SECTION =====
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 25, 2, 2, 'F')
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('BOOKING REFERENCE', margin + 8, yPos + 8)
  
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(data.pnr, margin + 8, yPos + 19)
  
  // Booking date
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(`Booked: ${data.bookingDate}`, pageWidth - margin - 8, yPos + 16, { align: 'right' })

  yPos += 35

  // ===== FLIGHT DETAILS SECTION =====
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.text('FLIGHT DETAILS', margin, yPos)
  
  yPos += 8

  // Flight box with border
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
  doc.setLineWidth(0.5)
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 45, 2, 2, 'S')

  const originCode = getAirportProperty('originAirport', 'iataCode')
  const destCode = getAirportProperty('destinationAirport', 'iataCode')
  const originCity = getAirportProperty('originAirport', 'city')
  const destCity = getAirportProperty('destinationAirport', 'city')
  const departureTime = getFlightProperty('departureTime')
  const arrivalTime = getFlightProperty('arrivalTime')
  const flightNumber = getFlightProperty('flightNumber')
  const departureDate = getFlightProperty('departureDate') || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const duration = getFlightProperty('duration') || '1h 30m'

  const boxCenterY = yPos + 22.5

  // Origin
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(originCode, margin + 20, boxCenterY - 5, { align: 'center' })
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(originCity, margin + 20, boxCenterY + 2, { align: 'center' })
  
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(departureTime, margin + 20, boxCenterY + 10, { align: 'center' })

  // Center - Flight info
  const centerX = pageWidth / 2
  
  // Arrow line
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setLineWidth(1.5)
  doc.line(margin + 45, boxCenterY - 2, pageWidth - margin - 45, boxCenterY - 2)
  
  // Arrow head
  doc.setFillColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.triangle(
    pageWidth - margin - 45, boxCenterY - 2,
    pageWidth - margin - 48, boxCenterY - 4,
    pageWidth - margin - 48, boxCenterY,
    'F'
  )

  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.text(flightNumber, centerX, boxCenterY + 4, { align: 'center' })
  
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(departureDate, centerX, boxCenterY + 9, { align: 'center' })
  doc.text(duration, centerX, boxCenterY + 14, { align: 'center' })

  // Destination
  doc.setFontSize(32)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(destCode, pageWidth - margin - 20, boxCenterY - 5, { align: 'center' })
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(destCity, pageWidth - margin - 20, boxCenterY + 2, { align: 'center' })
  
  doc.setFontSize(13)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(0, 0, 0)
  doc.text(arrivalTime, pageWidth - margin - 20, boxCenterY + 10, { align: 'center' })

  yPos += 55

  // ===== PASSENGER DETAILS SECTION =====
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.text('PASSENGER DETAILS', margin, yPos)
  
  yPos += 8

  // Table header
  doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
  doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F')
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text('PASSENGER NAME', margin + 5, yPos + 6.5)
  doc.text('TYPE', margin + 95, yPos + 6.5)
  doc.text('SEAT', margin + 125, yPos + 6.5)
  doc.text('TICKET NO.', margin + 145, yPos + 6.5)

  yPos += 10

  // Passenger rows
  data.passengers.forEach((passenger, index) => {
    // Check if we need a new page (need 10mm for row + some margin)
    if (yPos + 15 > pageHeight - 20) {
      doc.addPage()
      yPos = margin
      
      // Redraw table header on new page
      doc.setFillColor(lightGray[0], lightGray[1], lightGray[2])
      doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F')
      
      doc.setFontSize(9)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
      doc.text('PASSENGER NAME', margin + 5, yPos + 6.5)
      doc.text('TYPE', margin + 95, yPos + 6.5)
      doc.text('SEAT', margin + 125, yPos + 6.5)
      doc.text('TICKET NO.', margin + 145, yPos + 6.5)
      
      yPos += 10
    }
    
    // Alternating row colors
    if (index % 2 === 0) {
      doc.setFillColor(255, 255, 255)
    } else {
      doc.setFillColor(249, 250, 251)
    }
    doc.rect(margin, yPos, pageWidth - 2 * margin, 10, 'F')
    
    // Border line
    doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
    doc.setLineWidth(0.3)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    
    doc.setFontSize(9)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(0, 0, 0)
    
    const fullName = `${passenger.firstName} ${passenger.middleName || ''} ${passenger.lastName}`.trim().toUpperCase()
    doc.text(fullName, margin + 5, yPos + 6.5)
    
    const passengerTypeMap: Record<string, string> = {
      'ADT': 'Adult',
      'CHD': 'Child',
      'INFANT': 'Infant',
      'SENIOR': 'Senior'
    }
    doc.text(passengerTypeMap[passenger.passengerType] || 'Adult', margin + 95, yPos + 6.5)
    doc.text(passenger.flightSeatId ? `${passenger.flightSeatId}` : 'TBA', margin + 125, yPos + 6.5)
    doc.text(`${data.pnr}${index + 1}`, margin + 145, yPos + 6.5)
    
    yPos += 10
  })

  // Bottom border
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
  doc.line(margin, yPos, pageWidth - margin, yPos)

  yPos += 15

  // ===== FARE BREAKDOWN & QR CODE SECTION =====
  // Check if we need a new page (need 50mm for fare breakdown section)
  if (yPos + 58 > pageHeight - 20) {
    doc.addPage()
    yPos = margin
  }

  // Fare Breakdown - Simple list format
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.text('FARE BREAKDOWN', margin, yPos)
  
  yPos += 10

  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)

  // Format currency properly
  const formatCurrency = (amount: number) => {
    return `PHP ${amount.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const fareItems = [
    { label: 'Base Fare', value: formatCurrency(data.baseFare) },
    { label: 'Taxes & Fees', value: formatCurrency(data.taxes + data.fees) },
    { label: 'Fare Bundle', value: data.bundleName || 'SKYPLUS' }
  ]

  fareItems.forEach(item => {
    doc.text(item.label, margin, yPos)
    doc.text(item.value, margin + 80, yPos, { align: 'right' })
    yPos += 6
  })

  // Total line
  yPos += 2
  doc.setDrawColor(primaryBlue[0], primaryBlue[1], primaryBlue[2])
  doc.setLineWidth(0.8)
  doc.line(margin, yPos, margin + 80, yPos)
  
  yPos += 7
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.text('TOTAL AMOUNT', margin, yPos)
  doc.text(formatCurrency(data.totalPrice), margin + 80, yPos, { align: 'right' })

  yPos += 10

  yPos += 10

  // QR Code - positioned on the right side
  const qrData = `PNR:${data.pnr}|FLIGHT:${flightNumber}|PAX:${data.passengers.length}`
  const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
    width: 300,
    margin: 1,
    color: {
      dark: '#000000',
      light: '#FFFFFF'
    }
  })

  const qrSize = 40
  const qrX = pageWidth - margin - qrSize
  const qrY = yPos - 50 // Position it next to fare breakdown
  doc.addImage(qrCodeDataUrl, 'PNG', qrX, qrY, qrSize, qrSize)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text('Scan for check-in', qrX + qrSize / 2, qrY + qrSize + 5, { align: 'center' })

  yPos += 5

  // ===== CONTACT INFORMATION =====
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2])
  doc.text('CONTACT INFORMATION', margin, yPos)
  
  yPos += 7
  
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  doc.text(`Email: ${data.contactEmail}`, margin, yPos)
  doc.text(`Phone: ${data.contactPhone}`, margin, yPos + 6)

  yPos += 16

  // ===== IMPORTANT INFORMATION =====
  // Check if we need a new page (need 38mm for important info + 20mm for footer)
  if (yPos + 58 > pageHeight - 20) {
    doc.addPage()
    yPos = margin
  }

  doc.setFillColor(254, 243, 199) // Yellow background
  doc.roundedRect(margin, yPos, pageWidth - 2 * margin, 38, 2, 2, 'F')
  
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(146, 64, 14) // Orange text
  doc.text('IMPORTANT INFORMATION', margin + 5, yPos + 7)
  
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(0, 0, 0)
  
  const importantInfo = [
    '• Check-in opens 24 hours before departure',
    '• Arrive at the airport at least 2 hours before domestic flights',
    '• Valid government-issued ID required for all passengers',
    '• Baggage allowance: 7kg carry-on included',
    '• This e-ticket is valid only with a government-issued photo ID'
  ]
  
  let infoYPos = yPos + 13
  importantInfo.forEach(info => {
    doc.text(info, margin + 5, infoYPos)
    infoYPos += 5
  })

  // ===== FOOTER =====
  // Always place footer at the bottom of the current page
  yPos = pageHeight - 15
  
  doc.setDrawColor(borderGray[0], borderGray[1], borderGray[2])
  doc.setLineWidth(0.3)
  doc.line(margin, yPos, pageWidth - margin, yPos)
  
  yPos += 4
  
  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text('Skyways Airlines | www.skywaysairlines.com | +63 2 1234 5678', pageWidth / 2, yPos, { align: 'center' })
  doc.text('This is an electronic ticket. Please retain for your records.', pageWidth / 2, yPos + 3.5, { align: 'center' })
  doc.text(`Generated on ${new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}`, pageWidth / 2, yPos + 7, { align: 'center' })

  // Save the PDF
  doc.save(`E-Ticket-${data.pnr}.pdf`)
}
