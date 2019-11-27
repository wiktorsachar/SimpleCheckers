const board = ()=>[
    [
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0
    ],
    [
      0,
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0,
      0,
      0,
      { side: "b", queen: false }
    ],
    [
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0,
      { side: "b", queen: false },
      0
    ],
  
    [0, 0, 0, { side: "w", queen: true }, 0, 0, 0, 0],
    [0, 0, { side: "b", queen: false }, 0, 0, 0, 0, 0],
    [
      0,
      0,
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false }
    ],
    [
      { side: "w", queen: false },
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false },
      0
    ],
    [
      0,
      { side: "w", queen: true },
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false },
      0,
      { side: "w", queen: false }
    ]
  ];
  
  export default board;
  