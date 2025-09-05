import { loadCultureFiles } from '../common/culture-loader';
//Importing necessary modules
import {
    NodeModel,
    Node,
    Diagram,
    NodeConstraints,
    AnnotationConstraints,
    SnapConstraints,
    DiagramTools
  } from '@syncfusion/ej2-diagrams';
import { Dialog } from '@syncfusion/ej2-popups'; // Explicitly imported Dialog


// Define interfaces for better type safety
interface SeatInfo {
    seatNumber: string;
    row: string;
    column: number;
    price: number;
    tierCategory: string;
    booked: boolean;
}

interface SeatSelection {
    seatNumbers: string[];
    ticketCount: number;
    amount: number | null;
    category: string;
}

interface ShowTiming {
    id: number;
    time: string;
    type: string;
    status: string;
}


(window as any).default = (): void => {
    loadCultureFiles();
    let selectedTimingId: number = 1;
    let nodes: NodeModel[] = [];
    let seatSelection: SeatSelection = {
        seatNumbers: [],
        ticketCount: 0,
        amount: 0.0,
        category: ""
    };
    let selectedSeatsArray: string[] = []; // Explicitly typed as string array
    const timingSpecificBookedSeats: { [key: number]: string[] } = { // Explicitly typed for numeric keys to string arrays
        // 11:50 AM (Morning show - 45% booked = 117 seats booked, 143 available)
        1: [
            // Executive tier - Only best center seats (35 seats)
            "seatD9", "seatD10", "seatE9", "seatE10", "seatF8", "seatF9", "seatF10", "seatF11",
            "seatG7", "seatG8", "seatG9", "seatG10", "seatH6", "seatH7", "seatH8",
            "seatC9", "seatC10", "seatB9", "seatB10", "seatA9", "seatA10",
            "seatD8", "seatD11", "seatE8", "seatE11", "seatF7", "seatF12",
            "seatC8", "seatC11", "seatB8", "seatB11", "seatA8", "seatA11",
            "seatG6", "seatG11", "seatH5", "seatH9",

            // Corporate tier - Center seats only (25 seats)
            "seatI8", "seatI9", "seatJ8", "seatJ9", "seatK7", "seatK8", "seatK9", "seatK10",
            "seatL6", "seatL7", "seatL8", "seatL9", "seatM5", "seatM6", "seatM7", "seatM8",
            "seatI7", "seatI10", "seatJ7", "seatJ10", "seatK6", "seatK11",
            "seatL5", "seatL10", "seatM4",

            // Budget tier - Few center seats (15 seats)
            "seatN8", "seatN9", "seatO8", "seatO9", "seatP8", "seatP9",
            "seatN7", "seatN10", "seatO7", "seatO10", "seatP7", "seatP10",
            "seatN6", "seatO6", "seatP6"
        ],

        // 02:15 PM (Afternoon show - 100% booked = 260 seats booked, 0 available)
        2: [
            // Executive tier - All seats booked (138 seats)
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
            "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
            "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13", "seatH14",

            // Corporate tier - All seats booked (74 seats)
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
            "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",

            // Budget tier - All seats booked (48 seats)
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5", "seatP6", "seatP7", "seatP8", "seatP9", "seatP10", "seatP11", "seatP12", "seatP13", "seatP14", "seatP15", "seatP16"
        ],

        // 06:20 PM (Prime time - 85% booked = 221 seats booked, 39 available)
        3: [
            // Executive tier - Heavy booking (117 seats booked, 21 available)
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",
            "seatG1", "seatG2", "seatG3", "seatG4", "seatG5", "seatG6", "seatG7", "seatG8", "seatG9", "seatG10", "seatG11", "seatG12", "seatG13", "seatG14", "seatG15", "seatG16",
            "seatH1", "seatH2", "seatH3", "seatH4", "seatH5", "seatH6", "seatH7", "seatH8", "seatH9", "seatH10", "seatH11", "seatH12", "seatH13",

            // Corporate tier - Almost fully booked (66 seats booked, 8 available)
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10", "seatL11", "seatL12", "seatL13", "seatL14",
            "seatM1", "seatM2", "seatM3", "seatM4", "seatM5", "seatM6", "seatM7", "seatM8", "seatM9", "seatM10", "seatM11", "seatM12",

            // Budget tier - Heavy booking (38 seats booked, 10 available)
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
        ],

        // 09:15 PM (Night show - 78% booked = 203 seats booked, 57 available)
        4: [
            // Executive tier - Good booking (108 seats booked, 30 available)
            "seatA1", "seatA2", "seatA3", "seatA4", "seatA5", "seatA6", "seatA7", "seatA8", "seatA9", "seatA10", "seatA11", "seatA12", "seatA13", "seatA14", "seatA15", "seatA16", "seatA17", "seatA18",
            "seatB1", "seatB2", "seatB3", "seatB4", "seatB5", "seatB6", "seatB7", "seatB8", "seatB9", "seatB10", "seatB11", "seatB12", "seatB13", "seatB14", "seatB15", "seatB16", "seatB17", "seatB18",
            "seatC1", "seatC2", "seatC3", "seatC4", "seatC5", "seatC6", "seatC7", "seatC8", "seatC9", "seatC10", "seatC11", "seatC12", "seatC13", "seatC14", "seatC15", "seatC16", "seatC17", "seatC18",
            "seatD1", "seatD2", "seatD3", "seatD4", "seatD5", "seatD6", "seatD7", "seatD8", "seatD9", "seatD10", "seatD11", "seatD12", "seatD13", "seatD14", "seatD15", "seatD16", "seatD17", "seatD18",
            "seatE1", "seatE2", "seatE3", "seatE4", "seatE5", "seatE6", "seatE7", "seatE8", "seatE9", "seatE10", "seatE11", "seatE12", "seatE13", "seatE14", "seatE15", "seatE16", "seatE17", "seatE18",
            "seatF1", "seatF2", "seatF3", "seatF4", "seatF5", "seatF6", "seatF7", "seatF8", "seatF9", "seatF10", "seatF11", "seatF12", "seatF13", "seatF14", "seatF15", "seatF16", "seatF17", "seatF18",

            // Corporate tier - Moderate booking (58 seats booked, 16 available)
            "seatI1", "seatI2", "seatI3", "seatI4", "seatI5", "seatI6", "seatI7", "seatI8", "seatI9", "seatI10", "seatI11", "seatI12", "seatI13", "seatI14", "seatI15", "seatI16",
            "seatJ1", "seatJ2", "seatJ3", "seatJ4", "seatJ5", "seatJ6", "seatJ7", "seatJ8", "seatJ9", "seatJ10", "seatJ11", "seatJ12", "seatJ13", "seatJ14", "seatJ15", "seatJ16",
            "seatK1", "seatK2", "seatK3", "seatK4", "seatK5", "seatK6", "seatK7", "seatK8", "seatK9", "seatK10", "seatK11", "seatK12", "seatK13", "seatK14", "seatK15", "seatK16",
            "seatL1", "seatL2", "seatL3", "seatL4", "seatL5", "seatL6", "seatL7", "seatL8", "seatL9", "seatL10",

            // Budget tier - Light booking (37 seats booked, 11 available)
            "seatN1", "seatN2", "seatN3", "seatN4", "seatN5", "seatN6", "seatN7", "seatN8", "seatN9", "seatN10", "seatN11", "seatN12", "seatN13", "seatN14", "seatN15", "seatN16",
            "seatO1", "seatO2", "seatO3", "seatO4", "seatO5", "seatO6", "seatO7", "seatO8", "seatO9", "seatO10", "seatO11", "seatO12", "seatO13", "seatO14", "seatO15", "seatO16",
            "seatP1", "seatP2", "seatP3", "seatP4", "seatP5"
        ]
    };

    function getBookedSeatsForTiming(timingId: number): string[] {
        return timingSpecificBookedSeats[timingId] || [];
    }
    let diagram: Diagram; // Declare diagram here

    function refreshSeatingLayout(): void {
        const bookedSet: Set<string> = new Set(getBookedSeatsForTiming(selectedTimingId));
        diagram.nodes.forEach(function (node: NodeModel) {
            // Ensure addInfo exists and has seatNumber
            if (node.addInfo && (node.addInfo as SeatInfo).seatNumber) {
                // Type assertion for addInfo to SeatInfo
                const currentSeatInfo = node.addInfo as SeatInfo;

                // RESET all nodes first
                (node.style as any).fill = 'transparent'; // Use 'any' for style properties not directly on NodeStyleModel
                (node.style as any).strokeColor = '#9CA3AF';
                if (node.annotations && node.annotations[0]) {
                    node.annotations[0].style!.color = "#374151"; // Use non-null assertion for style
                }
                currentSeatInfo.booked = false;

                // Now re-apply BOOKED status for this timing
                if (bookedSet.has(node.id!)) { // Use non-null assertion for node.id
                    (node.style as any).fill = '#E5E7EB';
                    (node.style as any).strokeColor = '#E5E7EB';
                    if (node.annotations && node.annotations[0]) {
                        node.annotations[0].style!.color = "#9CA3AF";
                    }
                    currentSeatInfo.booked = true;
                }
                node.tooltip.content = seatTooltipTemplate(currentSeatInfo, node);
            }
        });
        diagram.dataBind();
    }
    const showTimings: ShowTiming[] = [
        { id: 1, time: "11:50 AM", type: "4K DOLBY ATMOS", status: "available" },
        { id: 2, time: "02:15 PM", type: "4K DOLBY ATMOS", status: "sold-out" },
        { id: 3, time: "06:20 PM", type: "4K DOLBY ATMOS", status: "filling-fast" },
        { id: 4, time: "09:15 PM", type: "4K DOLBY ATMOS", status: "available" }
    ];


    function createTierLabel(tierName: string, price: number, y: number): void {
        nodes.push({
            id: `tier-${tierName}`,
            width: 200,
            height: 25,
            offsetX: 585,
            offsetY: y,
            shape: { type: 'Text', content: `${tierName} - $${price}` },
            style: { fontSize: 16, bold: true },
            constraints: NodeConstraints.ReadOnly // Use imported NodeConstraints
        });
    }

    function createRowLabel(row: string, y: number): void {
        nodes.push({
            id: `row-${row}`,
            width: 30,
            height: 32,
            offsetX: 80,
            offsetY: y,
            shape: { type: 'Text', content: row },
            style: { fontSize: 14, bold: true },
            constraints: NodeConstraints.ReadOnly
        });
    }

    function createSeatNode(seatId: string, seatNumber: string, row: string, column: number, price: number, tier: string, x: number, y: number): void {
        let addInfoData: SeatInfo = { // Explicitly typed as SeatInfo
            seatNumber: seatNumber,
            row: row,
            column: column,
            price: price,
            tierCategory: tier,
            booked: false
        };
        nodes.push({
            id: seatId,
            width: 32,
            height: 32,
            offsetX: x,
            offsetY: y,
            shape: { cornerRadius: 4 },
            style: { strokeColor: '#9CA3AF', strokeWidth: 2 },
            annotations: [{
                content: column.toString()
            }],
            addInfo: addInfoData,
            tooltip: {
                // content: `Seat ${seatNumber} \n Tier: ${tier} \n price: $${price}`,
                content: seatTooltipTemplate(addInfoData),
                relativeMode: 'Object'
            },
            // Use imported NodeConstraints
            constraints: (NodeConstraints.Default | NodeConstraints.Tooltip | NodeConstraints.ReadOnly) & ~NodeConstraints.Select
        });
    }
    function seatTooltipTemplate(addInfoData: SeatInfo, currentNode?: NodeModel): string { // currentNode is optional
        // props is the node object (diagram node)
        let addInfo: SeatInfo = addInfoData; // No need for || {} as it's typed
        let seatNumber: string = addInfo.seatNumber || "";
        let row: string = addInfo.row || "";
        let tier: string = addInfo.tierCategory || (addInfo as any).Tier || ""; // Cast to any for Tier if it might exist
        let price: number | string = addInfo.price !== undefined ? addInfo.price : ""; // price can be number or string

        // You must determine selected/booked status here (JS logic)
        let isSelected: boolean = false;
        if (currentNode) {
            isSelected = (selectedSeatsArray && (selectedSeatsArray as any).includes(currentNode.id!)); // Non-null assertion for id
        }
        let isBooked: boolean = !!addInfo.booked;
        let status: string = isSelected ? "Selected" : isBooked ? "booked" : "Available";
        let statusBg: string = (isSelected ? "#28a745" : isBooked ? "#6c757d" : "#17a2b8");

        return `
      <div class="seat-tooltip" style="margin:0;padding:10px;font-family:Arial,sans-serif;min-width:150px;">
        <div style="font-weight:bold;margin-bottom:5px;font-size:14px;">
          Seat ${seatNumber}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Row:</strong> ${row}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Category:</strong> ${tier}
        </div>
        <div style="font-size:12px;margin-bottom:3px;">
          <strong>Price:</strong> $${price}
        </div>
        <div style="font-size:12px;margin-top:5px;">
          <span style="padding:2px 6px;border-radius:3px;font-weight:bold;background-color:${statusBg};color:white;font-size:11px;">
            ${status}
          </span>
        </div>
      </div>
    `;
    }
    function createSplitSeats(row: string, seatCount: number, price: number, tier: string, y: number): void {
        const center: number = 600;
        const seatWidth: number = 32;
        const spacing: number = 10;
        const aisle: number = 82;
        const leftSeats: number = Math.floor(seatCount / 2);
        const rightSeats: number = seatCount - leftSeats;
        const leftStartX: number = center - (aisle / 2) - (leftSeats * seatWidth + (leftSeats - 1) * spacing);
        const rightStartX: number = center + (aisle / 2);

        for (let i = 1; i <= leftSeats; i++) {
            const x: number = leftStartX + (i - 1) * (seatWidth + spacing);
            createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
        }
        for (let i = leftSeats + 1; i <= seatCount; i++) {
            const x: number = rightStartX + (i - leftSeats - 1) * (seatWidth + spacing);
            createSeatNode(`seat${row}${i}`, `${row}${i}`, row, i, price, tier, x, y);
        }
    }

    function createTierSeats(tier: string, price: number, startY: number, rows: { row: string, count: number }[]): number {
        let y: number = startY;
        createTierLabel(tier, price, y - 50);
        rows.forEach(({ row, count }) => {
            createRowLabel(row, y);
            createSplitSeats(row, count, price, tier, y);
            y += 48;
        });
        return y;
    }

    function createScreen(y: number): void {
        nodes.push({
            id: 'screen',
            width: 600,
            height: 80,
            offsetX: 580,
            offsetY: y,
            constraints: NodeConstraints.ReadOnly,
            shape: {
                type: 'Native', content: `<svg width="394" height="56" viewBox="0 0 394 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" stroke="#818CF8" stroke-width="2" stroke-linejoin="round" />
                                    <path d="M2 45.666C124.157 60.0821 312.899 51.6727 392 45.666" stroke="#818CF8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M27.0321 1.62598L2 37.6661C124.157 52.0822 312.899 43.6728 392 37.6661L364.965 1.62598C276.852 11.8374 148.187 11.8374 27.0321 1.62598Z" fill="#E0E7FF" />
                                </svg>` },
            annotations: [{
                content: 'Screen This Way',
                offset: { x: 0.5, y: 1.5 },
                constraints: AnnotationConstraints.ReadOnly,
                style: { fontSize: 14, color: '#818CF8' }
            }]
        });
    }

    function initializeLayout(): void {
        let y: number = 50;
        y = createTierSeats("Executive", 25, y, [
            { row: "A", count: 18 }, { row: "B", count: 18 }, { row: "C", count: 18 },
            { row: "D", count: 18 }, { row: "E", count: 18 }, { row: "F", count: 18 },
            { row: "G", count: 16 }, { row: "H", count: 14 }
        ]);
        y += 92;
        y = createTierSeats("Corporate", 16, y, [
            { row: "I", count: 16 }, { row: "J", count: 16 }, { row: "K", count: 16 },
            { row: "L", count: 14 }, { row: "M", count: 12 }
        ]);
        y += 92;
        y = createTierSeats("Budget", 8, y, [
            { row: "N", count: 16 }, { row: "O", count: 16 }, { row: "P", count: 16 }
        ]);
        y += 92;
        createScreen(y);
    }
    initializeLayout();
    let diagramCreated: boolean = false;
    diagram = new Diagram({ // Initialized diagram here
        width: '100%',
        height: '800px',
        nodes: nodes,
        snapSettings: { constraints: SnapConstraints.None },
       tool: DiagramTools.ZoomPan|DiagramTools.SingleSelect,
        created: () => {
            diagramCreated = true;
            diagram.fitToPage({ canZoomOut: true });
            refreshSeatingLayout();
            bindTimingClicks();
        },
        load: () => {
            if(diagramCreated){
                diagram.fitToPage();
            }
        },
        click: seatClicked
    });
    diagram.appendTo('#diagram');

    function bindTimingClicks(): void {
        let timingItems: NodeListOf<HTMLElement> = document.querySelectorAll('.timing-item');
        timingItems.forEach(function (item: HTMLElement) {
            // Don't bind click for sold-out (has pointer-events:none in style OR class)
            let timingId: number = parseInt(item.getAttribute("data-timing") || '0'); // Default to 0 if null
            if (item.classList.contains('sold-out')) return;
            item.onclick = function (): void {
                // Remove 'selected' class from all
                timingItems.forEach(function (it: HTMLElement) { it.classList.remove('selected'); });
                // Add 'selected' class to currently clicked
                item.classList.add('selected');
                // 1. Set selectedTimingId for JS
                selectedTimingId = timingId;
                // 2. Clear seat selection and update booking summary
                selectedSeatsArray = [];
                // 3. Refresh booking UI for the new timing
                refreshSeatingLayout();
                updateBookingSummary();
                updateBookingSummaryUI();
                hideNotification();
                updateDateTime(selectedTimingId - 1);
            };
        });
    }

    function showNotification(message: string): void {
        let notif: HTMLElement | null = document.getElementById("notification");
        if (notif) {
            notif.textContent = message;
            notif.style.display = "block";
        }
    }
    function hideNotification(): void {
        let notif: HTMLElement | null = document.getElementById("notification");
        if (notif) {
            notif.style.display = "none";
        }
    } 
    function unSelectSeat(seatNode: NodeModel): void{
        // Logic for DESELECTING a seat
        const idx: number = selectedSeatsArray.indexOf(seatNode.id!);
        if (idx !== -1) {
            selectedSeatsArray.splice(idx, 1);
        }
        // Reset styling for previously selected seats
        (seatNode.style as any).fill = "transparent";
        (seatNode.style as any).strokeColor = "#9CA3AF";
        if (seatNode.annotations && seatNode.annotations[0] && seatNode.annotations[0].style) {
            seatNode.annotations[0].style!.color = "#374151"; // Reset annotation color
        }
    }
    function seatClicked(args: any): void { // args type can be more specific like DiagramClickEventArgs
        if (args && args.element && args.element instanceof Node && args.element.addInfo) {
            let currentNode: NodeModel = args.element;
            if ((currentNode.addInfo as SeatInfo).booked) {
                currentNode.tooltip.content = seatTooltipTemplate(currentNode.addInfo as SeatInfo, currentNode);
                return;
            } else {
                if (!(selectedSeatsArray as any).includes(currentNode.id!)) {
                    // --- Get current seat's tier ---
                    let newTier: string = ((currentNode.addInfo as SeatInfo).tierCategory || (currentNode.addInfo as any).Tier || "").toString();
                    // --- Find all selected seats' node infos ---
                    let selectedSeats: NodeModel[] = selectedSeatsArray.map(function (seatId: string) {
                        let node = diagram.getObject(seatId);
                        return node && (node as Node).addInfo ? node : null;
                    }).filter(Boolean) as NodeModel[];
                    // --- If there are previously selected seats, check their tier ---
                    let currentTier: string | null = selectedSeats.length > 0
                        ? ((selectedSeats[0].addInfo as SeatInfo).tierCategory || (selectedSeats[0].addInfo as any).Tier || "").toString()
                        : null;
                    let differentTier: boolean = Boolean(currentTier && newTier !== currentTier); // Ensure boolean type
                    // --- Handle switching tier: clear previous, only select new seat ---
                    if (differentTier) {
                        //Iterate backwards to avoid skipping elements after splicing
                        for (let i: number = selectedSeatsArray.length - 1; i >= 0; i--) {
                            const seatNode: NodeModel = diagram.getObject(selectedSeatsArray[i]) as NodeModel;
                            if (seatNode) {
                                unSelectSeat(seatNode);
                                // Update tooltip for these deselected original seats
                                seatNode.tooltip.content = seatTooltipTemplate(seatNode.addInfo as SeatInfo, seatNode);
                            }
                        }
                        hideNotification();
                    } else if (selectedSeatsArray.length >= 10) {
                        // --- Limit 10 seats ---
                        showNotification("Maximum 10 tickets can be selected");
                        return;
                    }
                    // Now add the new selection
                    selectedSeatsArray.push(currentNode.id!);
                    (currentNode.style as any).fill = "#15803D";
                    (currentNode.style as any).strokeColor = "#15803D";
                    if (currentNode.annotations && currentNode.annotations[0]) {
                        currentNode.annotations[0].style!.color = "white";
                    }
                    diagram.dataBind();
                    if (selectedSeatsArray.length < 10) {
                        hideNotification();
                    }
                } else {
                    // --- Remove seat ---
                    unSelectSeat(currentNode);
                    diagram.dataBind();
                    hideNotification();
                }
                currentNode.tooltip.content = seatTooltipTemplate(currentNode.addInfo as SeatInfo, currentNode);
                updateBookingSummary();
                updateBookingSummaryUI();
            }
        }
    }
    function updateBookingSummary(): void {
        if (selectedSeatsArray.length > 0) {
            let selectedSeats: { seatNumber: string; row: string; price: number; Tier: string; }[] = selectedSeatsArray.map(function (seatId: string) {
                let node: any = diagram.getObject(seatId);
                // Type check and assertion for node.addInfo
                if (node && node.addInfo && (node.addInfo as SeatInfo).seatNumber !== undefined) {
                    let price: number = parseFloat((node.addInfo as SeatInfo).price.toString()); // Convert to string then parse
                    if (isNaN(price)) price = 0;
                    return {
                        seatNumber: (node.addInfo as SeatInfo).seatNumber || "",
                        row: (node.addInfo as SeatInfo).row || "",
                        price: price,
                        Tier: ((node.addInfo as SeatInfo).tierCategory || (node.addInfo as any).Tier || "").toString()
                    };
                }
                return null;
            }).filter(Boolean) as { seatNumber: string; row: string; price: number; Tier: string; }[]; // Filter nulls and assert type

            seatSelection.seatNumbers = selectedSeats.map(s => s.seatNumber);
            seatSelection.ticketCount = selectedSeats.length;
            let totalAmount: number = selectedSeats.reduce((sum: number, s) => sum + (Number(s.price) || 0), 0);
            seatSelection.amount = selectedSeats.length ? totalAmount : null;
            seatSelection.category = selectedSeats.length > 0 ? selectedSeats[0].Tier.toUpperCase() : "";
        } else {
            seatSelection.seatNumbers = [];
            seatSelection.ticketCount = 0;
            seatSelection.amount = null;
            seatSelection.category = "";
        }
    }
    function updateBookingSummaryUI(): void {
        const ticketCountElem: HTMLElement | null = document.getElementById('ticketCount');
        const totalAmountElem: HTMLElement | null = document.getElementById('totalAmount');
        const priceHintElem: HTMLElement | null = document.getElementById('priceHint');
        const ticketAmountElem: HTMLElement | null = document.getElementById('ticketAmount');
        const feesAmountElem: HTMLElement | null = document.getElementById('feesAmount');
        const proceedButton: HTMLButtonElement | null = document.getElementById('proceedButton') as HTMLButtonElement;


        if (seatSelection.ticketCount > 0) {
            if (ticketCountElem) ticketCountElem.innerText = seatSelection.ticketCount + " Tickets Selected";
            if (totalAmountElem) totalAmountElem.innerText = seatSelection.amount === null ? '$0' : "$" + (seatSelection.amount + 6);
            if (priceHintElem) priceHintElem.style.display = 'block';
            if (ticketAmountElem) ticketAmountElem.innerText = "Tickets: $" + (seatSelection.amount);
            if (feesAmountElem) feesAmountElem.innerText = "+ Fees: $" + 6;
        } else {
            if (ticketCountElem) ticketCountElem.innerText = "0 Tickets Selected";
            if (totalAmountElem) totalAmountElem.innerText = "$0";
            if (priceHintElem) priceHintElem.style.display = 'none';
            if (ticketAmountElem) ticketAmountElem.innerText = "";
            if (feesAmountElem) feesAmountElem.innerText = "";
        }
        if (proceedButton) proceedButton.disabled = seatSelection.ticketCount === 0;
    }

    function updateDateTime(id: number): void {
        const showTiming: ShowTiming = showTimings[id];
        const now: Date = new Date();
        const options: Intl.DateTimeFormatOptions = {
            weekday: 'long',
            day: '2-digit',
            month: 'short'
        };
        const formatted: string = now.toLocaleString('en-IN', options);
        const movieTimingElem: HTMLElement | null = document.getElementById('movie-timing');
        if (movieTimingElem) movieTimingElem.textContent = `${formatted}` + `, ${showTiming.time}`;
        const day: string = now.toLocaleDateString('en-IN', { weekday: 'short' });
        const date: string = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
        const dateLabelElem: HTMLElement | null = document.getElementById('date-label');
        if (dateLabelElem) dateLabelElem.innerHTML = `${day}<br>${date}`;
    }

    updateDateTime(0);

    function bookSeatsForTiming(timingId: number, bookingSeatIds: string[]): void {
        if (!timingSpecificBookedSeats[timingId]) {
            timingSpecificBookedSeats[timingId] = [];
        }
        timingSpecificBookedSeats[timingId].push(...bookingSeatIds);
    }
    // Razor-inspired dialog content builder
    function buildBookingSuccessHtml(movieTitle: string, theater: string, showTime: string, seats: string, totalAmount: string, bookingId: string): string {
        return `
  <div class="notification-header">
    <div class="success-icon">&#10003;</div>
    <div class="success-title">Booking Confirmed!</div>
    <div class="success-message">
      Your tickets have been successfully booked.
    </div>
  </div>
  <div class="booking-details">
    <h4>Booking Details:</h4>
    <p><strong>Movie:</strong> ${movieTitle}</p>
    <p><strong>Theater:</strong> ${theater}</p>
    <p><strong>Show Time:</strong> ${showTime}</p>
    <p><strong>Seats:</strong> ${seats}</p>
    <p><strong>Total Amount:</strong> $${totalAmount}</p>
    <p><strong>Booking ID:</strong> ${bookingId}</p>
  </div>
  `;
    }

    // Create the dialog ONCE (not inside proceed click!)
    let bookingDialog: Dialog = new Dialog({ // Explicitly typed as Dialog
        cssClass: '', // Do not set 'success-modal' here
        content: '',
        width: '435px',
        target:'.control-section',
        isModal: true,
        visible: false,
        showCloseIcon: false,
        buttons: [{
            click: function (): void { bookingDialog.hide(); },
            buttonModel: { content: 'Close', cssClass: 'btn2 btn2-proceed', isPrimary: true }
        }]
    });
    bookingDialog.appendTo('#bookingSuccessDialog');
    const proceedButton: HTMLElement | null = document.getElementById('proceedButton');
    if (proceedButton) {
        proceedButton.onclick = function (): void {
            if (selectedSeatsArray.length === 0) return;

            // Mark booked, update timingSpecificBookedSeats, etc...
            bookSeatsForTiming(selectedTimingId, selectedSeatsArray);

            let movieTitle: string = "F1: The Movie";
            let theater: string = "Velvet Aurora Cinematheque";
            let showTime: string = document.getElementById('movie-timing')?.textContent || '';
            let seats: string = seatSelection.seatNumbers.join(", ");
            let totalAmount: string = (seatSelection.amount !== null ? seatSelection.amount + 6 : 6).toFixed(2); // Handle null amount
            let bookingId: string = 'VAC' + Date.now().toString().slice(-8);

            // Set dialog content with proper classes
            bookingDialog.content = buildBookingSuccessHtml(movieTitle, theater, showTime, seats, totalAmount, bookingId);
            bookingDialog.show();

            // Mark seats as booked,
            selectedSeatsArray.forEach(function (seatId: string) {
                let node: NodeModel | undefined = diagram.getObject(seatId);
                if (node && node.addInfo) {
                    (node.addInfo as SeatInfo).booked = true; // Assert addInfo as SeatInfo
                    (node.style as any).fill = '#E5E7EB';
                    (node.style as any).strokeColor = '#E5E7EB';
                    if (node.annotations && node.annotations[0]) {
                        node.annotations[0].style!.color = '#9CA3AF';
                    }
                }
            });

            // Clear select, refresh UI
            selectedSeatsArray = [];
            updateBookingSummary();
            updateBookingSummaryUI();
            refreshSeatingLayout();
            hideNotification();
        };
    }
};