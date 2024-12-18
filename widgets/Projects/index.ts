import ProjectsWidget from '~/widgets/Projects/ui.vue'

export {
  ProjectsWidget
}

// CREATE TABLE blocks (
//   id SERIAL PRIMARY KEY,
//   project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
// type VARCHAR(50) NOT NULL,
//
// review TEXT,
// photo VARCHAR(255),
// name VARCHAR(255),
// job_title VARCHAR(255),
//
// title VARCHAR(255),
// content JSONB,
// images_with_gap BOOLEAN,
// images JSONB,
//
// ordinary_title VARCHAR(255),
// ordinary_content JSONB,
// created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// interface asdf {
//   tags: string[]
//   title: string
//   description: string
//   publishYear: string | number
//   completedWorksTitles: string[]
//   previewImage: string
//   previewDescription: string
//   appImage: string
//   blocks: (
//     {
//       type: 'review',
//       review: string,
//       photo: string,
//       name: string,
//       jobTitle: string
//     }
//     |
//     {
//       type: 'splitBlockDivided',
//       title: string,
//       content: {
//         title: string,
//         description: string,
//         isBetween?: boolean
//       }[],
//       imagesMosaic?: 'left' | 'right',
//       images: {
//         image: string,
//         width: 'full' | 'half'
//       }[]
//     }
//     |
//     {
//       type: 'splitBlock',
//       content: {
//         title: string,
//         smallTitle?: string
//         description?: string,
//         dedicatedDescription?: string
//       }[],
//       features?: {
//         title: string
//         description: string
//       }[],
//       imagesMosaic?: 'left' | 'right',
//       images: {
//         image: string,
//         width: 'full' | 'half'
//       }[]
//     }
//     |
//     {
//       type: 'ordinary',
//       title: string,
//       content: {
//         title: string,
//         description: string,
//         images: string[]
//       }[],
//       imagesMosaic?: 'left' | 'right',
//       images: {
//         image: string,
//         width: 'full' | 'half'
//       }[]
//     }
//   )[]
// }
