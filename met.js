
var current_met = [
  [50, 68, 75, 81, 84, 89, 91, 93, 94, 96, 97],
  [32, 50, 60, 67, 74, 80, 84, 88, 90, 92, 94],
  [25, 40, 50, 57, 65, 71, 76, 80, 84, 87, 89],
  [19, 33, 43, 50, 58, 64, 70, 75, 79, 82, 85],
  [16, 26, 35, 42, 50, 57, 63, 68, 73, 77, 80],
  [11, 20, 29, 36, 43, 50, 56, 62, 67, 71, 75],
  [ 9, 16, 24, 30, 37, 44, 50, 55, 61, 66, 70],
  [ 7, 12, 20, 25, 32, 38, 45, 50, 55, 60, 65],
  [ 6, 10, 16, 21.17, 27, 33, 39, 45, 50, 55, 60],
  [ 4,  8, 13, 17.59, 23, 29, 34, 40, 45, 50, 55],
  [ 3,  6.07, 10.56, 15, 20, 25, 30, 35, 40, 45, 50]
]

function load_met(name) {
  data = mets[name]

  if (data == null) {
    throw "Undefined met"
  }

  lines = data["PreCrawford"]["Data"].split("\n")
  current_met = []
  for (i = 0; i < lines.length; i++) {
    line = lines[i].split("=")
    values = line[1].split(" ")
    current_met[i] = []
    for (j = 0; j < values.length; j++) {
      current_met[i][j] = values[j]
    }
  }
  
}
// Cube at _current_ value
function takepoint_dc(aw1, aw2, cube) {
  recube = cube * 2

  aw1 -= 1
  aw2 -= 1
  if (aw1 < 0 || aw2 < 0 || aw1 > current_met.length || aw2 > current_met.length)
    return 'n/a'

  pass = aw2 >= cube ? current_met[aw1][aw2 - cube] : 0
  lose = aw2 >= recube ? current_met[aw1][aw2 - recube] : 0
  win = aw1 >= recube ? current_met[aw1 - recube][aw2] : 1

  risk = pass - lose 
  gain = win - pass
 
  return (risk / (risk + gain))
}

function takepoint_lc(aw1, aw2, cube) {

  if (cube > aw1 || cube > aw2) {
    return takepoint_dc(aw1, aw2, cube)
  }
  return (takepoint_dc(aw1, aw2, cube) * (1 - takepoint_lc(aw2, aw1, cube * 2)))
}

load_met("Rockwell-Kazaross")


