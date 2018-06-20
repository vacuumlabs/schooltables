export const emptyRectangular = {
  header: [],
  side: [],
  data: [[]],
}

export const emptyHeader = {
  side: [],
  data: [],
}

export const emptyStandard = {
  side: [],
  data: [],
}

const getInitialState = () => ({
  resources: {},
  surveys: {},
  surveyList: [],
  create: {
    title: '',
    tables: [
      {
        ...emptyHeader,
      },
    ],
  },
})

export default getInitialState
