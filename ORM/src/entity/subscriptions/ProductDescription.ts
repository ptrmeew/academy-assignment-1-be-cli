import { Entity, PrimaryColumn } from 'typeorm';

/**
 * This entity contains information about what a subscription unlocks. some examples could be:
 *
 * - A subscription level (unlocks all content that has a level lower or equal to the one in the description)
 * - how much daily/weekly usage of a feature (Create N amount of posts in 1 day)
 */
@Entity()
export class ProductDescription {
  @PrimaryColumn('varchar')
  product_id: string;

  // Put in your own columns here about what the subscription unlocks.
}
