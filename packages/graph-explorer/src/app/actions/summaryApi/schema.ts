import * as z from 'zod';

const schema = z.object({
    payload: z.object({
        lastStatisticsComputationTime: z.string().pipe(z.coerce.date()),
        graphSummary: z.object({
            numDistinctSubjects: z.number(),
            numDistinctPredicates: z.number(),
            numQuads: z.number(),
            numClasses: z.number(),
            classes: z.array(z.string()),
            predicates: z.array(
                z.record(z.string().min(3), z.number()),
            ),
            subjectStructures: z.array(
                z.object({
                    count: z.number(),
                    predicates: z.array(z.string()),
                }),
            ),
        }),
    }),
});

// Inferring type from parsed schema
type SummaryApiResponse = z.infer<typeof schema>;

export {
    schema
};
export type { SummaryApiResponse };

// sample response payload
// {
//     "status": "200 OK",
//     "payload": {
//         "version": "v1",
//         "lastStatisticsComputationTime": "2023-02-23T22:39:50.362Z",
//         "graphSummary": {
//             "numDistinctSubjects": 78134770,
//             "numDistinctPredicates": 57,
//             "numQuads": 478355852,
//             "numClasses": 15,
//             "classes": [
//                 "http://dbpedia.org/ontology/University",
//                 "http://aws.amazon.com/neptune/csv2rdf/class/Continent",
//                 "http://dbpedia.org/ontology/City"
//             ],
//             "predicates": [
//                 {
//                     "http://www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate": 60690020
//                 },
//                 {
//                     "http://aws.amazon.com/neptune/csv2rdf/datatypeProperty/author": 1
//                 },
//                 {
//                     "http://aws.amazon.com/neptune/csv2rdf/datatypeProperty/date": 1
//                 }
//             ],
//             "subjectStructures": [
//                 {
//                     "count": 19949360,
//                     "predicates": [
//                         "http://www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/creationDate",
//                         "http://www.ldbc.eu/ldbc_socialnet/1.0/vocabulary/hasComment"
//                     ]
//                 }
//             ]
//         }
//     }
// }