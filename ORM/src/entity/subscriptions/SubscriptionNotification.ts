import { Entity, Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IOSSubscription } from './IOSSubscription';

/**
 * This entity contains information about what type of notification was received and when.
 * This is in its own separate entity and linked to an ios-subscription so that a log of notifications can be kept.
 * This is useful if something unexpected happend with a subscription so that it can be traced
 * what exactly happened
 */
@Entity()
export class SubscriptionNotification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  /**
   * This is only relevant for ios subscriptions. This could indicate whether a subcription change was a
   * downgrade, upgrade or crossgrade as an example.
   */
  @Column({ nullable: true })
  subtype: string;

  @Column('timestamptz')
  timestamp: string;

  @ManyToOne(() => IOSSubscription)
  @JoinColumn({
    name: 'ios_subscription_fk',
    referencedColumnName: 'id',
  })
  iosSubscription: IOSSubscription;
}
