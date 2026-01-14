-- Create Visitor Stats table
CREATE TABLE IF NOT EXISTS visitor_stats (
    id TEXT PRIMARY KEY,
    total_visitors INTEGER DEFAULT 0,
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial row
INSERT INTO visitor_stats (id, total_visitors) 
VALUES ('main', 0)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE visitor_stats ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access" ON visitor_stats
    FOR SELECT
    USING (true);

CREATE POLICY "Allow public update" ON visitor_stats
    FOR UPDATE
    USING (true);

CREATE POLICY "Allow public insert" ON visitor_stats
    FOR INSERT
    WITH CHECK (true);

-- Create index
CREATE INDEX IF NOT EXISTS idx_visitor_stats_id ON visitor_stats(id);
