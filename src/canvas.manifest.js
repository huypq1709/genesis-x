export const manifest = {
  screens: {
    scr_qyi8xm: { name: "Home", route: "/", position: { "x": 160, "y": 7760 } },
    scr_497370: { name: "Provide Sample", route: "/start", state: { "step": 0 }, position: { "x": 160, "y": 1820 } },
    scr_rduw8v: { name: "Select Traits", route: "/start", state: { "step": 1 }, position: { "x": 1560, "y": 1820 } },
    scr_p2rmb2: { name: "Running Analysis", route: "/start", state: { "step": 2 }, position: { "x": 2960, "y": 1820 } },
    scr_bhby8j: { name: "Evolution Blueprint", route: "/start", state: { "step": 3, "selectedTraits": ["physique", "intelligence", "longevity"] }, position: { "x": 4360, "y": 1820 } },
    scr_hysrgl: { name: "Pricing (Wizard)", route: "/start", state: { "step": 4, "selectedTraits": ["physique", "intelligence", "longevity"] }, position: { "x": 1560, "y": 7760 } },
    scr_fe72a4: { name: "Pricing Page", route: "/pricing", position: { "x": 2960, "y": 7760 } },
    scr_gjjq9j: { name: "Gene Database", route: "/database", position: { "x": 160, "y": 3800 } },
    scr_yso08e: { name: "AI Simulation", route: "/simulation", position: { "x": 1560, "y": 3800 } },
    scr_uvo8tc: { name: "Laboratory", route: "/laboratory", position: { "x": 2960, "y": 3800 } },
    scr_ii4yfo: { name: "Biosecurity", route: "/biosecurity", position: { "x": 160, "y": 5780 } },
    scr_t2uoil: { name: "Bioethics", route: "/bioethics", position: { "x": 1560, "y": 5780 } },
    scr_ah4vb5: { name: "DNA Privacy", route: "/privacy", position: { "x": 2960, "y": 5780 } },
    scr_xmklx0: { name: "Terms of Use", route: "/terms", position: { "x": 4360, "y": 5780 } }
  },
  sections: {
    sec_506vlc: { name: "Sample Analysis Flow", x: 0, y: 1600, width: 5720, height: 1180 },
    sec_uvkzzn: { name: "Tools & Features", x: 0, y: 3580, width: 4320, height: 1180 },
    sec_y6qyyh: { name: "Information & Resources", x: 0, y: 5560, width: 5720, height: 1180 },
    sec_oh8olj: { name: "Landing & Pricing", x: 0, y: 7540, width: 4320, height: 1180 }
  },
  layers: [
  { kind: "section", id: "sec_506vlc", children: [
    { kind: "screen", id: "scr_497370" },
    { kind: "screen", id: "scr_rduw8v" },
    { kind: "screen", id: "scr_p2rmb2" },
    { kind: "screen", id: "scr_bhby8j" }]
  },
  { kind: "section", id: "sec_uvkzzn", children: [
    { kind: "screen", id: "scr_gjjq9j" },
    { kind: "screen", id: "scr_yso08e" },
    { kind: "screen", id: "scr_uvo8tc" }]
  },
  { kind: "section", id: "sec_y6qyyh", children: [
    { kind: "screen", id: "scr_ii4yfo" },
    { kind: "screen", id: "scr_t2uoil" },
    { kind: "screen", id: "scr_ah4vb5" },
    { kind: "screen", id: "scr_xmklx0" }]
  },
  { kind: "section", id: "sec_oh8olj", children: [
    { kind: "screen", id: "scr_qyi8xm" },
    { kind: "screen", id: "scr_hysrgl" },
    { kind: "screen", id: "scr_fe72a4" }]
  }]

};