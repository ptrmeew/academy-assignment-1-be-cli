import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductDescription } from './ProductDescription';

/**
 * This entity represents an ios subscription through apples in_app_purchase. 1 of these entries will be
 * created when a user purhases a subscription through the create-ios-subscription edge function.
 * This contains relevant information about the subscription that will be updated when notifications from app store connect
 * are received about the users subscription.
 */

@Entity()
export class IOSSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The product_id column references what product the current subscription unlocks.
   * The data about the product is stored in the ProductDescription entity
   */
  @ManyToOne(() => ProductDescription)
  @JoinColumn({
    name: 'product_id',
    referencedColumnName: 'product_id',
  })
  product: ProductDescription;

  /**
   * The auto_renew_product_id column references what product the subscription should be changed to
   * when the subscription is renewed. This is used when a subscription is downgraded, since the current
   * product must be available for the user until next renewal.
   * The data about the product is stored in the ProductDescription entity
   */
  @ManyToOne(() => ProductDescription)
  @JoinColumn({
    name: 'auto_renew_product_id',
    referencedColumnName: 'product_id',
  })
  autoRenewProduct: ProductDescription;

  @Column()
  will_auto_renew: boolean;

  /**
   * This column contains the id of the first transaction made for a subscription. This is used
   * to identify the ios-subscription when the ios-notification edge function gets
   * updates about a subscription
   */
  @Column()
  original_transaction_id: string;

  @Column()
  expires_date_ms: string;
}
