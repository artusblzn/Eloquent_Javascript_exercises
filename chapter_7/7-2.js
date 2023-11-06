// Robot efficiency

// Can you write a robot that finishes the delivery task faster than goalOrientedRobot?
//If you observe that robot’s behavior, what obviously stupid things does it do? How could those be improved?

// If you solved the previous exercise, you might want to use your compareRobots function to
//verify whether you improved the robot.

// // Your code here

// runRobotAnimation(VillageState.random(), yourRobot, memory);

const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);

  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }

  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }

  return graph;
}

const roadGraph = buildGraph(roads);

function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }

  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place != this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place != p.address);

      return new VillageState(destination, parcels);
    }
  }
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];

  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;

    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place == address);

    parcels.push({ place, address });
  }

  return new VillageState("Post Office", parcels);
};

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place);
      if (!work.some((w) => w.at == place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

function smarterRobot({ place, parcels }, route) {
  let destinations = getDestinations(place, parcels);
  let shortestRoute = findShortestRoute(place, destinations);

  return { direction: shortestRoute[0], memory: shortestRoute.slice(1) };
}

function getDestinations(place, parcels) {
  let unpickedUpParcelsPlaces = parcels
    .filter((parcel) => {
      return parcel.place != place;
    })
    .map((parcel) => parcel.place);

  let pickedUpParcels = parcels.filter((parcel) => {
    return parcel.place == place;
  });
  let pickedUpParcelsAddresses = pickedUpParcels.map(
    (parcel) => parcel.address
  );

  return unpickedUpParcelsPlaces.concat(pickedUpParcelsAddresses);
}

function findShortestRoute(origin, destinations) {
  let route = [];
  let candidateRoute = [];
  for (const destination of destinations) {
    candidateRoute = findRoute(roadGraph, origin, destination);
    if (route.length == 0 || candidateRoute.length < route.length) {
      route = candidateRoute;
    }
  }
  return route;
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length == 0) {
      //      console.log(`Done in ${turn} turns`);
      return turn;
    }

    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    //      console.log(`Moved to ${action.direction}`);
  }
}

function goalOrientedRobot({ place, parcels }, route) {
  if (route.length == 0) {
    let parcel = parcels[0];
    if (parcel.place != place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }

  return { direction: route[0], memory: route.slice(1) };
}

function compareRobots(robot1, memory1, robot2, memory2) {
  let efficiencyRobot1 = [];
  let efficiencyRobot2 = [];
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    efficiencyRobot1.push(runRobot(state, robot1, memory1));
    efficiencyRobot2.push(runRobot(state, robot2, memory2));
  }

  console.log(
    efficiencyRobot1.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / 100
  );

  console.log(
    efficiencyRobot2.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    ) / 100
  );
}

let state = VillageState.random();

compareRobots(smarterRobot, [], goalOrientedRobot, []);
