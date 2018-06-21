export const emptyRectangular = {
  type: 'rectangular',
  header: [''],
  side: [''],
  data: [[]],
}

export const emptyHeader = {
  type: 'header',
  side: [''],
  data: [],
}

export const emptyStandard = {
  type: 'standard',
  header: [''],
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
