import { ResponsiveLine } from '@nivo/line'

// const data = [
//   {
//     "id": "japan",
//     "color": "hsl(57, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 218
//       },
//       {
//         "x": "helicopter",
//         "y": 116
//       },
//       {
//         "x": "boat",
//         "y": 184
//       },
//       {
//         "x": "train",
//         "y": 124
//       },
//       {
//         "x": "subway",
//         "y": 186
//       },
//       {
//         "x": "bus",
//         "y": 103
//       },
//       {
//         "x": "car",
//         "y": 221
//       },
//       {
//         "x": "moto",
//         "y": 214
//       },
//       {
//         "x": "bicycle",
//         "y": 162
//       },
//       {
//         "x": "horse",
//         "y": 216
//       },
//       {
//         "x": "skateboard",
//         "y": 230
//       },
//       {
//         "x": "others",
//         "y": 240
//       }
//     ]
//   },
//   {
//     "id": "france",
//     "color": "hsl(250, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 140
//       },
//       {
//         "x": "helicopter",
//         "y": 78
//       },
//       {
//         "x": "boat",
//         "y": 159
//       },
//       {
//         "x": "train",
//         "y": 116
//       },
//       {
//         "x": "subway",
//         "y": 26
//       },
//       {
//         "x": "bus",
//         "y": 113
//       },
//       {
//         "x": "car",
//         "y": 223
//       },
//       {
//         "x": "moto",
//         "y": 251
//       },
//       {
//         "x": "bicycle",
//         "y": 194
//       },
//       {
//         "x": "horse",
//         "y": 41
//       },
//       {
//         "x": "skateboard",
//         "y": 252
//       },
//       {
//         "x": "others",
//         "y": 188
//       }
//     ]
//   },
//   {
//     "id": "us",
//     "color": "hsl(159, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 224
//       },
//       {
//         "x": "helicopter",
//         "y": 272
//       },
//       {
//         "x": "boat",
//         "y": 279
//       },
//       {
//         "x": "train",
//         "y": 164
//       },
//       {
//         "x": "subway",
//         "y": 264
//       },
//       {
//         "x": "bus",
//         "y": 273
//       },
//       {
//         "x": "car",
//         "y": 132
//       },
//       {
//         "x": "moto",
//         "y": 272
//       },
//       {
//         "x": "bicycle",
//         "y": 20
//       },
//       {
//         "x": "horse",
//         "y": 180
//       },
//       {
//         "x": "skateboard",
//         "y": 35
//       },
//       {
//         "x": "others",
//         "y": 61
//       }
//     ]
//   },
//   {
//     "id": "germany",
//     "color": "hsl(217, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 33
//       },
//       {
//         "x": "helicopter",
//         "y": 174
//       },
//       {
//         "x": "boat",
//         "y": 21
//       },
//       {
//         "x": "train",
//         "y": 285
//       },
//       {
//         "x": "subway",
//         "y": 254
//       },
//       {
//         "x": "bus",
//         "y": 161
//       },
//       {
//         "x": "car",
//         "y": 252
//       },
//       {
//         "x": "moto",
//         "y": 148
//       },
//       {
//         "x": "bicycle",
//         "y": 173
//       },
//       {
//         "x": "horse",
//         "y": 43
//       },
//       {
//         "x": "skateboard",
//         "y": 275
//       },
//       {
//         "x": "others",
//         "y": 60
//       }
//     ]
//   },
//   {
//     "id": "norway",
//     "color": "hsl(238, 70%, 50%)",
//     "data": [
//       {
//         "x": "plane",
//         "y": 148
//       },
//       {
//         "x": "helicopter",
//         "y": 261
//       },
//       {
//         "x": "boat",
//         "y": 269
//       },
//       {
//         "x": "train",
//         "y": 125
//       },
//       {
//         "x": "subway",
//         "y": 172
//       },
//       {
//         "x": "bus",
//         "y": 110
//       },
//       {
//         "x": "car",
//         "y": 166
//       },
//       {
//         "x": "moto",
//         "y": 194
//       },
//       {
//         "x": "bicycle",
//         "y": 164
//       },
//       {
//         "x": "horse",
//         "y": 158
//       },
//       {
//         "x": "skateboard",
//         "y": 104
//       },
//       {
//         "x": "others",
//         "y": 32
//       }
//     ]
//   }
// ]

const LineChartSales = () => {
    return (
        <>
            <ResponsiveLine
                data={[]}
                margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                xScale={{ type: 'point' }}
                yScale={{
                    type: 'linear',
                    min: 'auto',
                    max: 'auto',
                    stacked: true,
                    reverse: false,
                }}
                yFormat=' >-.0f'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,

                    // legend: 'transportation',
                    legendOffset: 36,
                    legendPosition: 'middle',
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,

                    // legend: 'count',
                    legendOffset: -40,
                    legendPosition: 'middle',
                }}
                colors={{ scheme: 'category10' }}
                enableGridX={false}
                pointSize={10}
                pointColor={{ theme: 'background' }}
                pointBorderWidth={2}
                pointBorderColor={{ from: 'serieColor' }}
                pointLabelYOffset={-12}
                useMesh={true}
                legends={[
                    {
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 100,
                        translateY: 0,
                        itemsSpacing: 0,
                        itemDirection: 'left-to-right',
                        itemWidth: 80,
                        itemHeight: 20,
                        itemOpacity: 0.75,
                        symbolSize: 12,
                        symbolShape: 'circle',
                        symbolBorderColor: 'rgba(0, 0, 0, .5)',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemBackground: 'rgba(0, 0, 0, .03)',
                                    itemOpacity: 1,
                                },
                            },
                        ],
                    },
                ]}
            />
        </>
    )
}

export default LineChartSales
