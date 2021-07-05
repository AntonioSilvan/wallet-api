import connector from '../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository'

export class SubscriptionMysqlRepository implements SubscriptionRepository{
    
    async all(){
        const [rows] = await connector.execute( 'SELECT * FROM wallet_subscription ORDER BY id DESC');
        return rows as Subscription[];
    }

    async find(id:number){
        const [rows]:any[] = await connector.execute('SELECT * FROM wallet_subscription WHERE id = ?', [id]);
        if(rows.length){
            return rows[0] as Subscription;
        }

        return null;
    }

    async findByUserAndCode(id:number, code:string){
        const [rows]:any[] = await connector.execute('SELECT * FROM wallet_subscription WHERE id = ? AND code = ?', [id, code]);
        if(rows.length){
            return rows[0] as Subscription;
        }

        return null;
    }

    async store(entry:Subscription){
        const now = new Date();
        await connector.execute('INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)', 
        [entry.user_id, entry.code, entry.amount, entry.cron, now]);
    }

    async update(entry:Subscription){
        const now = new Date();
        await connector.execute('UPDATE wallet_subscription SET code = ?, amount = ?, cron = ?, updated_at = ? WHERE user_id = ?', 
        [entry.code, entry.amount, entry.cron, now, entry.user_id]);
    }

    async remove(id:number){
        await connector.execute('DELETE FROM wallet_subscription WHERE user_id = ?', [id]);
    }
}